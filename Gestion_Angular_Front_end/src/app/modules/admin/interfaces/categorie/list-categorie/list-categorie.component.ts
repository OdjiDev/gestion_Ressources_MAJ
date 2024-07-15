import { PersonelService } from 'src/app/services/personel.service';
import { PersonelDto } from 'src/app/classes/personel-dto';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';

import { Router } from '@angular/router';

import { CategorieDto } from 'src/app/classes/categorie-dto';
import { ProduitDto } from 'src/app/classes/produit-dto';
import { CategorieService } from 'src/app/services/categorie.service';
import { ProduitService } from 'src/app/services/produit.service';
import jsPDF from 'jspdf';

@Component({
  selector: 'app-list-categorie',
  templateUrl: './list-categorie.component.html',
  styleUrls: ['./list-categorie.component.css']
})
export class ListCategorieComponent implements OnInit {


//declaration des variables
@ViewChild('content') pdfTable!: ElementRef;
categorieDtos: CategorieDto[] = [];
categorieDto: CategorieDto = new CategorieDto();
message: any;
style: any;
// Variables pour la pagination
currentPage = 1;
itemsPerPage = 10;
totalItems = 0;
totalPages = 0;
filteredCategories: CategorieDto[] = [];
datas: CategorieDto[] = [];
searchText: string = '';
filterBy: string = '';
pages: number[] = [];
constructor(private categorieService: CategorieService) {
  this.getAllCategorieDtos();
}


delete() {
  this.categorieService.deleteCategorie(this.categorieDto.id).subscribe(
    (data) => {
      this.showSuccessMessage('Categorie' + this.categorieDto.id + ' supprimé avec succès!!' + data);
      this.getAllCategorieDtos();
      this.categorieDto = new CategorieDto();
    }
  );
}
// deleteCategorie(categorie: CategorieDto) {
//   this.categorieDto = categorie;
// }
deleteCategorie(id: number){
    this.categorieService.deleteCategorie(id).subscribe( data => {
      console.log(data);
      this.getAllCategorieDtos();
    })
  }



ngOnInit() {
  this.getAllCategorieDtos();
  this.filteredData();
}

async getAllCategorieDtos() {
  await this.categorieService.getCategories().subscribe(
    (data: CategorieDto[]) => {
      this.categorieDtos = data;
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
    this.datas.sort((a, b) => a.nomcategorie.localeCompare(b.nomcategorie));

  }

  this.totalItems = this.datas.length;
  this.totalPages = Math.ceil(this.totalItems / this.itemsPerPage);
  this.filteredData();
  this.getPages();
}
async filterCategorieLists() {
  // Filter les données en fonction de la recherche sur tout les champs de la classe categorie
  try {
    if (this.searchText) {
      this.datas = await this.categorieDtos.filter(categorie => {
        return  categorie.nomcategorie.toLowerCase().includes(this.searchText.toLowerCase());
        // || categorie.produitDto.codeproduit.toLowerCase().includes(this.searchText.toLowerCase());
      });
    } else {
      this.datas = this.categorieDtos;
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
  this.filteredCategories = this.datas.slice(startPage, endPage);
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









