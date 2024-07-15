import { PersonelService } from 'src/app/services/personel.service';
import { PersonelDto } from 'src/app/classes/personel-dto';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';

import { Router } from '@angular/router';

import { FournisseurDto } from 'src/app/classes/fournisseur-dto';
import { ProduitDto } from 'src/app/classes/produit-dto';
import { FournisseurService } from 'src/app/services/fournisseur.service';
import { ProduitService } from 'src/app/services/produit.service';
import jsPDF from 'jspdf';

@Component({
  selector: 'app-list-fournisseur',
  templateUrl: './list-fournisseur.component.html',
  styleUrls: ['./list-fournisseur.component.css']
})
export class ListFournisseurComponent implements OnInit {


//declaration des variables
@ViewChild('content') pdfTable!: ElementRef;
fournisseurDtos: FournisseurDto[] = [];
fournisseurDto: FournisseurDto = new FournisseurDto();
message: any;
style: any;
// Variables pour la pagination
currentPage = 1;
itemsPerPage = 10;
totalItems = 0;
totalPages = 0;
filteredFournisseurs: FournisseurDto[] = [];
datas: FournisseurDto[] = [];
searchText: string = '';
filterBy: string = '';
pages: number[] = [];
constructor(private fournisseurService: FournisseurService) {
  this.getAllFournisseurDtos();
}


delete() {
  this.fournisseurService.deleteFournisseur(this.fournisseurDto.id).subscribe(
    (data) => {
      this.showSuccessMessage('Fournisseur' + this.fournisseurDto.id + ' supprimé avec succès!!' + data);
      this.getAllFournisseurDtos();
      this.fournisseurDto = new FournisseurDto();
    }
  );
}
// deleteFournisseur(fournisseur: FournisseurDto) {
//   this.fournisseurDto = fournisseur;
// }
deleteFournisseur(id: number){
    this.fournisseurService.deleteFournisseur(id).subscribe( data => {
      console.log(data);
      this.getAllFournisseurDtos();
    })
  }



ngOnInit() {
  this.getAllFournisseurDtos();
  this.filteredData();
}

async getAllFournisseurDtos() {
  await this.fournisseurService.getFournisseurs().subscribe(
    (data: FournisseurDto[]) => {
      this.fournisseurDtos = data;
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
    this.datas.sort((a, b) => a.prenom.localeCompare(b.prenom));

  }

  this.totalItems = this.datas.length;
  this.totalPages = Math.ceil(this.totalItems / this.itemsPerPage);
  this.filteredData();
  this.getPages();
}
async filterFournisseurLists() {
  // Filter les données en fonction de la recherche sur tout les champs de la classe fournisseur
  try {
    if (this.searchText) {
      this.datas = await this.fournisseurDtos.filter(fournisseur => {
        return  fournisseur.nom.toLowerCase().includes(this.searchText.toLowerCase());
        // || fournisseur.produitDto.codeproduit.toLowerCase().includes(this.searchText.toLowerCase());
      });
    } else {
      this.datas = this.fournisseurDtos;
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
  this.filteredFournisseurs = this.datas.slice(startPage, endPage);
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









