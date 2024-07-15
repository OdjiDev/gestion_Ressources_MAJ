import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { PDFDocument } from 'pdf-lib';
import { Router } from '@angular/router';
import jsPDF from 'jspdf';
import { SuivieDto } from 'src/app/classes/suivie-dto';
import { SuivieService } from 'src/app/services/suivie.service';

@Component({
  selector: 'app-list-suivie',
  templateUrl: './list-suivie.component.html',
  styleUrls: ['./list-suivie.component.css']
})
export class ListSuivieComponent implements OnInit {

//declaration des variables
@ViewChild('content') pdfTable!: ElementRef;
suivieDtos: SuivieDto[] = [];
suivieDto: SuivieDto = new SuivieDto();
message: any;
style: any;
// Variables pour la pagination
currentPage = 1;
itemsPerPage = 10;
totalItems = 0;
totalPages = 0;
filteredSuivies: SuivieDto[] = [];
datas: SuivieDto[] = [];
searchText: string = '';
filterBy: string = '';
pages: number[] = [];
constructor(private suivieService: SuivieService) {
  this.getAllSuivieDtos();
}


delete() {
  this.suivieService.deleteSuivie(this.suivieDto.id).subscribe(
    (data) => {
      this.showSuccessMessage('Suivie' + this.suivieDto.id + ' supprimé avec succès!!' + data);
      this.getAllSuivieDtos();
      this.suivieDto = new SuivieDto();
    }
  );
}
// deleteDepartent(suivie: SuivieDto) {
//   this.suivieDto = suivie;
// }
deleteSuivie(id: number){
  this.suivieService.deleteSuivie(id).subscribe( data => {
    console.log(data);
    this.getAllSuivieDtos();
  })
}

ngOnInit() {
  this.getAllSuivieDtos();
  this.filteredData();
}

async getAllSuivieDtos() {
  await this.suivieService.getSuivies().subscribe(
    (data: SuivieDto[]) => {
      this.suivieDtos = data;
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

// Ordonner les données en fonction du nom du champ
// tri par ordre alphabétique suit le nom de la colonne
filterByChanged() {
  if (this.filterBy == 'code') {
    this.datas.sort((a, b) => a.code.localeCompare(b.code));
  } else if (this.filterBy == 'date') {
    this.datas.sort((a, b) => a.date.localeCompare(b.date));
  }
else if (this.filterBy == 'genre') {
  this.datas.sort((a, b) => a.genre.localeCompare(b.genre));
} else if (this.filterBy == 'type') {
  this.datas.sort((a, b) => a.typeSuivie.localeCompare(b.typeSuivie));
}

  this.totalItems = this.datas.length;
  this.totalPages = Math.ceil(this.totalItems / this.itemsPerPage);
  this.filteredData();
  this.getPages();
}
async filterSuivieLists() {
  // Filter les données en fonction de la recherche sur tout les champs de la classe suivie
  try {
    if (this.searchText) {
      this.datas = await this.suivieDtos.filter(suivie => {
        return suivie.code.toLowerCase().includes(this.searchText.toLowerCase())
          || suivie.date.toLowerCase().includes(this.searchText.toLowerCase())
          || suivie.typeSuivie.toLowerCase().includes(this.searchText.toLowerCase())
          || suivie.genre.toLowerCase().includes(this.searchText.toLowerCase())
      });
    } else {
      this.datas = this.suivieDtos;
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
  this.filteredSuivies = this.datas.slice(startPage, endPage);
  this.getPages();
}
generatePDF() {
  const pdf = new jsPDF('p', 'pt', 'a4');
  pdf.html(this.pdfTable.nativeElement, {
    callback: (pdf) => {
      pdf.save('Suivies.pdf');
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












