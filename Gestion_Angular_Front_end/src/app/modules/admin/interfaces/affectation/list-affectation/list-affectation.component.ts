import { PersonelService } from 'src/app/services/personel.service';
import { PersonelDto } from 'src/app/classes/personel-dto';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';

import { Router } from '@angular/router';

import { AffectationDto } from 'src/app/classes/affectation-dto';
import { ProduitDto } from 'src/app/classes/produit-dto';
import { AffectationService } from 'src/app/services/affectation.service';
import { ProduitService } from 'src/app/services/produit.service';
import jsPDF from 'jspdf';

@Component({
  selector: 'app-list-affectation',
  templateUrl: './list-affectation.component.html',
  styleUrls: ['./list-affectation.component.css']
})
export class ListAffectationComponent implements OnInit {


//declaration des variables
@ViewChild('content') pdfTable!: ElementRef;
affectationDtos: AffectationDto[] = [];
affectationDto: AffectationDto = new AffectationDto();
message: any;
style: any;
// Variables pour la pagination
currentPage = 1;
itemsPerPage = 10;
totalItems = 0;
totalPages = 0;
filteredAffectations: AffectationDto[] = [];
datas: AffectationDto[] = [];
searchText: string = '';
filterBy: string = '';
pages: number[] = [];
constructor(private affectationService: AffectationService) {
  this.getAllAffectationDtos();
}


delete() {
  this.affectationService.deleteAffectation(this.affectationDto.id).subscribe(
    (data) => {
      this.showSuccessMessage('Affectation' + this.affectationDto.id + ' supprimé avec succès!!' + data);
      this.getAllAffectationDtos();
      this.affectationDto = new AffectationDto();
    }
  );
}
// deleteAffectation(affectation: AffectationDto) {
//   this.affectationDto = affectation;
// }
deleteAffectation(id: number){
    this.affectationService.deleteAffectation(id).subscribe( data => {
      console.log(data);
      this.getAllAffectationDtos();
    })
  }



ngOnInit() {
  this.getAllAffectationDtos();
  this.filteredData();
}

async getAllAffectationDtos() {
  await this.affectationService.getAffectations().subscribe(
    (data: AffectationDto[]) => {
      this.affectationDtos = data;
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
async filterAffectationLists() {
  // Filter les données en fonction de la recherche sur tout les champs de la classe affectation
  try {
    if (this.searchText) {
      this.datas = await this.affectationDtos.filter(affectation => {
        return  affectation.motif.toLowerCase().includes(this.searchText.toLowerCase());
        // || affectation.produitDto.codeproduit.toLowerCase().includes(this.searchText.toLowerCase());
      });
    } else {
      this.datas = this.affectationDtos;
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
  this.filteredAffectations = this.datas.slice(startPage, endPage);
  this.getPages();
}
generatePDF() {
  const pdf = new jsPDF('p', 'pt', 'a4');
  pdf.html(this.pdfTable.nativeElement, {
    callback: (pdf) => {
      pdf.save('affectations.pdf');
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









