import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { PDFDocument } from 'pdf-lib';
import { Router } from '@angular/router';
import jsPDF from 'jspdf';
import { SocieteDto } from 'src/app/classes/societe-dto';
import { SocieteService } from 'src/app/services/societe.service';

@Component({
  selector: 'app-list-societe',
  templateUrl: './list-societe.component.html',
  styleUrls: ['./list-societe.component.css']
})
export class ListSocieteComponent implements OnInit {

//declaration des variables
@ViewChild('content') pdfTable!: ElementRef;
societeDtos: SocieteDto[] = [];
societeDto: SocieteDto = new SocieteDto();
message: any;
style: any;
// Variables pour la pagination
currentPage = 1;
itemsPerPage = 10;
totalItems = 0;
totalPages = 0;
filteredSocietes: SocieteDto[] = [];
datas: SocieteDto[] = [];
searchText: string = '';
filterBy: string = '';
pages: number[] = [];
constructor(private societeService: SocieteService) {
  this.getAllSocieteDtos();
}


delete() {
  this.societeService.deleteSociete(this.societeDto.id).subscribe(
    (data) => {
      this.showSuccessMessage('Societe' + this.societeDto.id + ' supprimé avec succès!!' + data);
      this.getAllSocieteDtos();
      this.societeDto = new SocieteDto();
    }
  );
}
deleteSociete(societe: SocieteDto) {
  this.societeDto = societe;
  this.delete();
}

ngOnInit() {
  this.getAllSocieteDtos();
  this.filteredData();
}

async getAllSocieteDtos() {
  await this.societeService.getSocietes().subscribe(
    (data: SocieteDto[]) => {
      this.societeDtos = data;
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
  if (this.filterBy == 'nom') {
    this.datas.sort((a, b) => a.nom.localeCompare(b.nom));
  } else if (this.filterBy == '') {
    this.datas.sort((a, b) => a.numerofiscal.localeCompare(b.numerofiscal));
  }

  this.totalItems = this.datas.length;
  this.totalPages = Math.ceil(this.totalItems / this.itemsPerPage);
  this.filteredData();
  this.getPages();
}
async filterSocieteLists() {
  // Filter les données en fonction de la recherche sur tout les champs de la classe societe
  try {
    if (this.searchText) {
      this.datas = await this.societeDtos.filter(societe => {
        return societe.numerofiscal.toLowerCase().includes(this.searchText.toLowerCase())
          || societe.nom.toLowerCase().includes(this.searchText.toLowerCase());
      });
    } else {
      this.datas = this.societeDtos;
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
  this.filteredSocietes = this.datas.slice(startPage, endPage);
  this.getPages();
}
generatePDF() {
  const pdf = new jsPDF('p', 'pt', 'a4');
  pdf.html(this.pdfTable.nativeElement, {
    callback: (pdf) => {
      pdf.save('Societes.pdf');
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













