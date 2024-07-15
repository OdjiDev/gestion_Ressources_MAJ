import { PersonelService } from 'src/app/services/personel.service';
import { PersonelDto } from 'src/app/classes/personel-dto';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';

import { Router } from '@angular/router';

import { FactureDto } from 'src/app/classes/facture-dto';
import { FactureService } from 'src/app/services/facture.service';
import jsPDF from 'jspdf';

@Component({
  selector: 'app-list-facture',
  templateUrl: './list-facture.component.html',
  styleUrls: ['./list-facture.component.css']
})
export class ListFactureComponent implements OnInit {


//declaration des variables
@ViewChild('content') pdfTable!: ElementRef;
factureDtos: FactureDto[] = [];
factureDto: FactureDto = new FactureDto();
message: any;
style: any;
// Variables pour la pagination
currentPage = 1;
itemsPerPage = 10;
totalItems = 0;
totalPages = 0;
filteredFactures: FactureDto[] = [];
datas: FactureDto[] = [];
searchText: string = '';
filterBy: string = '';
pages: number[] = [];
constructor(private factureService: FactureService) {
  this.getAllFactureDtos();
}


delete() {
  this.factureService.deleteFacture(this.factureDto.id).subscribe(
    (data) => {
      this.showSuccessMessage('Facture' + this.factureDto.id + ' supprimé avec succès!!' + data);
      this.getAllFactureDtos();
      this.factureDto = new FactureDto();
    }
  );
}
// deleteFacture(facture: FactureDto) {
//   this.factureDto = facture;
// }
deleteFacture(id: number){
    this.factureService.deleteFacture(id).subscribe( data => {
      console.log(data);
      this.getAllFactureDtos();
    })
  }



ngOnInit() {
  this.getAllFactureDtos();
  this.filteredData();
}

async getAllFactureDtos() {
  await this.factureService.getFactures().subscribe(
    (data: FactureDto[]) => {
      this.factureDtos = data;
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

// Ordonner les données en fonction du code du champ
// tri par ordre alphabétique suit le code de la colonne
filterByChanged() {
  if (this.filterBy == 'code') {
    this.datas.sort((a, b) => a.code.localeCompare(b.code));
    this.datas.sort((a, b) => a.datecommande.localeCompare(b.datecommande));

  }

  this.totalItems = this.datas.length;
  this.totalPages = Math.ceil(this.totalItems / this.itemsPerPage);
  this.filteredData();
  this.getPages();
}
async filterFactureLists() {
  // Filter les données en fonction de la recherche sur tout les champs de la classe facture
  try {
    if (this.searchText) {
      this.datas = await this.factureDtos.filter(facture => {
        return  facture.code.toLowerCase().includes(this.searchText.toLowerCase());
        // || facture.produitDto.codeproduit.toLowerCase().includes(this.searchText.toLowerCase());
      });
    } else {
      this.datas = this.factureDtos;
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
  this.filteredFactures = this.datas.slice(startPage, endPage);
  this.getPages();
}
generatePDF() {
  const pdf = new jsPDF('p', 'pt', 'a4');
  pdf.html(this.pdfTable.nativeElement, {
    callback: (pdf) => {
      pdf.save('factures.pdf');
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









