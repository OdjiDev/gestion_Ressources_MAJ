import { PersonelService } from 'src/app/services/personel.service';
import { PersonelDto } from 'src/app/classes/personel-dto';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';

import { Router } from '@angular/router';


import { ProduitDto } from 'src/app/classes/produit-dto';
import { ReparationService } from 'src/app/services/reparation.service';
import { ProduitService } from 'src/app/services/produit.service';
import jsPDF from 'jspdf';
import { ReparationDto } from 'src/app/reparation-dto';

@Component({
  selector: 'app-list-reparation',
  templateUrl: './list-reparation.component.html',
  styleUrls: ['./list-reparation.component.css']
})
export class ListReparationComponent implements OnInit {


//declaration des variables
@ViewChild('content') pdfTable!: ElementRef;
reparationDtos: ReparationDto[] = [];
reparationDto: ReparationDto = new ReparationDto();
message: any;
style: any;
// Variables pour la pagination
currentPage = 1;
itemsPerPage = 10;
totalItems = 0;
totalPages = 0;
filteredReparations: ReparationDto[] = [];
datas: ReparationDto[] = [];
searchText: string = '';
filterBy: string = '';
pages: number[] = [];
constructor(private reparationService: ReparationService) {
  this.getAllReparationDtos();
}


delete() {
  this.reparationService.deleteReparation(this.reparationDto.id).subscribe(
    (data) => {
      this.showSuccessMessage('Reparation' + this.reparationDto.id + ' supprimé avec succès!!' + data);
      this.getAllReparationDtos();
      this.reparationDto = new ReparationDto();
    }
  );
}
// deleteReparation(reparation: ReparationDto) {
//   this.reparationDto = reparation;
// }
deleteReparation(id: number){
    this.reparationService.deleteReparation(id).subscribe( data => {
      console.log(data);
      this.getAllReparationDtos();
    })
  }



ngOnInit() {
  this.getAllReparationDtos();
  this.filteredData();
}

async getAllReparationDtos() {
  await this.reparationService.getReparations().subscribe(
    (data: ReparationDto[]) => {
      this.reparationDtos = data;
      this.datas = data;
      this.totalItems = data.length;
      this.totalPages = Math.ceil(this.totalItems / this.itemsPerPage);
      this.filteredData();
    }
  );
}
itemsPerPageChanged() {
  this.currentPage = 1;
  this.filteredData();
  this.getPages();
}

// Ordonner les données en fonction du motif du champ
// tri par ordre alphabétique suit le motif de la colonne
filterByChanged() {
  if (this.filterBy == 'motif') {
    this.datas.sort((a, b) => a.motif.localeCompare(b.motif));
    this.datas.sort((a, b) => a.produitDto.codeproduit.localeCompare(b.produitDto.codeproduit));

  }

  this.totalItems = this.datas.length;
  this.totalPages = Math.ceil(this.totalItems / this.itemsPerPage);
  this.filteredData();
  this.getPages();
}
async filterReparationLists() {
  // Filter les données en fonction de la recherche sur tout les champs de la classe reparation
  try {
    if (this.searchText) {
      this.datas = await this.reparationDtos.filter(reparation => {
        return  reparation.motif.toLowerCase().includes(this.searchText.toLowerCase());
        // || reparation.produitDto.codeproduit.toLowerCase().includes(this.searchText.toLowerCase());
      });
    } else {
      this.datas = this.reparationDtos;
    }
    this.filteredData();
  } catch (error) {
    console.error(error);
  }
}
// Méthode pour obtenir les numéros de page à afficher dans la pagination
getPages() {
  this.totalItems = this.datas.length;
  this.totalPages = Math.ceil(this.totalItems / this.itemsPerPage);
  this.pages = Array(this.totalPages).fill(0).map((_, index) => index + 1);

}

// Méthode pour changer de page
goToPage(page: number): void {
  if (page >= 1 && page <= this.totalPages) {
    this.currentPage = page;
    this.filteredData();
  }
}

nextPage() {
  if (this.currentPage < this.totalPages) {
    this.currentPage++;
    this.filteredData();
  }
}
previousPage() {
  if (this.currentPage > 1) {
    this.currentPage--;
    this.filteredData();
  }
}

async filteredData() {
  let startPage = (this.currentPage - 1) * this.itemsPerPage;
  let endPage = startPage + this.itemsPerPage;
  this.filteredReparations = this.datas.slice(startPage, endPage);
  this.getPages();
}
generatePDF() {
  const pdf = new jsPDF('p', 'pt', 'a4');
  pdf.html(this.pdfTable.nativeElement, {
    callback: (pdf) => {
      pdf.save('reparations.pdf');
    }
  });
}

showSuccessMessage(message: string) {
  this.message = message;
  this.style = "alert alert-danger";
  setTimeout(() => {
    this.message = '';
  }, 5000);
}
}









