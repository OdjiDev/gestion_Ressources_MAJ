import { PersonelService } from 'src/app/services/personel.service';
import { PersonelDto } from 'src/app/classes/personel-dto';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';

import { Router } from '@angular/router';

import { ContratDto } from 'src/app/classes/contrat-dto';
import { ProduitDto } from 'src/app/classes/produit-dto';
import { ContratService } from 'src/app/services/contrat.service';
import { ProduitService } from 'src/app/services/produit.service';
import jsPDF from 'jspdf';

@Component({
  selector: 'app-list-contrat',
  templateUrl: './list-contrat.component.html',
  styleUrls: ['./list-contrat.component.css']
})
export class ListContratComponent implements OnInit {


//declaration des variables
@ViewChild('content') pdfTable!: ElementRef;
contratDtos: ContratDto[] = [];
contratDto: ContratDto = new ContratDto();
message: any;
style: any;
// Variables pour la pagination
currentPage = 1;
itemsPerPage = 10;
totalItems = 0;
totalPages = 0;
filteredContrats: ContratDto[] = [];
datas: ContratDto[] = [];
searchText: string = '';
filterBy: string = '';
pages: number[] = [];
constructor(private contratService: ContratService) {
  this.getAllContratDtos();
}


delete() {
  this.contratService.deleteContrat(this.contratDto.id).subscribe(
    (data) => {
      this.showSuccessMessage('Contrat' + this.contratDto.id + ' supprimé avec succès!!' + data);
      this.getAllContratDtos();
      this.contratDto = new ContratDto();
    }
  );
}
// deleteContrat(contrat: ContratDto) {
//   this.contratDto = contrat;
// }
deleteContrat(id: number){
    this.contratService.deleteContrat(id).subscribe( data => {
      console.log(data);
      this.getAllContratDtos();
    })
  }



ngOnInit() {
  this.getAllContratDtos();
  this.filteredData();
}

async getAllContratDtos() {
  await this.contratService.getContrats().subscribe(
    (data: ContratDto[]) => {
      this.contratDtos = data;
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
    this.datas.sort((a, b) => a.code.localeCompare(b.code));
    this.datas.sort((a, b) => a.nom.localeCompare(b.nom));

  }

  this.totalItems = this.datas.length;
  this.totalPages = Math.ceil(this.totalItems / this.itemsPerPage);
  this.filteredData();
  this.getPages();
}
async filterContratLists() {
  // Filter les données en fonction de la recherche sur tout les champs de la classe contrat
  try {
    if (this.searchText) {
      this.datas = await this.contratDtos.filter(contrat => {
        return  contrat.nom.toLowerCase().includes(this.searchText.toLowerCase())
          || contrat.code.toLowerCase().includes(this.searchText.toLowerCase());
      });
    } else {
      this.datas = this.contratDtos;
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
  this.filteredContrats = this.datas.slice(startPage, endPage);
  this.getPages();
}
generatePDF() {
  const pdf = new jsPDF('p', 'pt', 'a4');
  pdf.html(this.pdfTable.nativeElement, {
    callback: (pdf) => {
      pdf.save('Bureaus.pdf');
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









