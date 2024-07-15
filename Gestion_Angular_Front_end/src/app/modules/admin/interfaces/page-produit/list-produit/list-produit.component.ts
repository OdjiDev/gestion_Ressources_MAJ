import { PersonelService } from 'src/app/services/personel.service';
import { PersonelDto } from 'src/app/classes/personel-dto';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';

import { Router } from '@angular/router';


import { ProduitDto } from 'src/app/classes/produit-dto';
import { ProduitService } from 'src/app/services/produit.service';

import jsPDF from 'jspdf';

@Component({
  selector: 'app-list-produit',
  templateUrl: './list-produit.component.html',
  styleUrls: ['./list-produit.component.css']
})
export class ListProduitComponent implements OnInit {


//declaration des variables
@ViewChild('content') pdfTable!: ElementRef;
produitDtos: ProduitDto[] = [];
produitDto: ProduitDto = new ProduitDto();
message: any;
style: any;
// Variables pour la pagination
currentPage = 1;
itemsPerPage = 10;
totalItems = 0;
totalPages = 0;
filteredProduits: ProduitDto[] = [];
datas: ProduitDto[] = [];
searchText: string = '';
filterBy: string = '';
pages: number[] = [];
constructor(private produitService: ProduitService) {
  this.getAllProduitDtos();
}


delete() {
  this.produitService.deleteProduit(this.produitDto.id).subscribe(
    (data) => {
      this.showSuccessMessage('Produit' + this.produitDto.id + ' supprimé avec succès!!' + data);
      this.getAllProduitDtos();
      this.produitDto = new ProduitDto();
    }
  );
}
// deleteProduit(produit: ProduitDto) {
//   this.produitDto = produit;
// }
deleteProduit(id: number){
    this.produitService.deleteProduit(id).subscribe( data => {
      console.log(data);
      this.getAllProduitDtos();
    })
  }



ngOnInit() {
  this.getAllProduitDtos();
  this.filteredData();
}

async getAllProduitDtos() {
  await this.produitService.getProduits().subscribe(
    (data: ProduitDto[]) => {
      this.produitDtos = data;
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
    this.datas.sort((a, b) => a.nom.localeCompare(b.nom));
    this.datas.sort((a, b) => a.designation.localeCompare(b.designation));

  }

  this.totalItems = this.datas.length;
  this.totalPages = Math.ceil(this.totalItems / this.itemsPerPage);
  this.filteredData();
  this.getPages();
}
async filterProduitLists() {
  // Filter les données en fonction de la recherche sur tout les champs de la classe produit
  try {
    if (this.searchText) {
      this.datas = await this.produitDtos.filter(produit => {
        return  produit.nom.toLowerCase().includes(this.searchText.toLowerCase());
        // || produit.produitDto.codeproduit.toLowerCase().includes(this.searchText.toLowerCase());
      });
    } else {
      this.datas = this.produitDtos;
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
  this.filteredProduits = this.datas.slice(startPage, endPage);
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









