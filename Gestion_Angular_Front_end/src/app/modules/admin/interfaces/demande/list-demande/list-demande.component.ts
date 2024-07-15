import { PersonelService } from 'src/app/services/personel.service';
import { PersonelDto } from 'src/app/classes/personel-dto';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';

import { Router } from '@angular/router';

import { DemandeDto } from 'src/app/classes/demande-dto';
import { ProduitDto } from 'src/app/classes/produit-dto';
import { DemandeService } from 'src/app/services/demande.service';
import { ProduitService } from 'src/app/services/produit.service';
import jsPDF from 'jspdf';

@Component({
  selector: 'app-list-demande',
  templateUrl: './list-demande.component.html',
  styleUrls: ['./list-demande.component.css']
})
export class ListDemandeComponent implements OnInit {


//declaration des variables
@ViewChild('content') pdfTable!: ElementRef;
demandeDtos: DemandeDto[] = [];
demandeDto: DemandeDto = new DemandeDto();
message: any;
style: any;
// Variables pour la pagination
currentPage = 1;
itemsPerPage = 10;
totalItems = 0;
totalPages = 0;
filteredDemandes: DemandeDto[] = [];
datas: DemandeDto[] = [];
searchText: string = '';
filterBy: string = '';
pages: number[] = [];
constructor(private demandeService: DemandeService) {
  this.getAllDemandeDtos();
}


delete() {
  this.demandeService.deleteDemande(this.demandeDto.id).subscribe(
    (data) => {
      this.showSuccessMessage('Demande' + this.demandeDto.id + ' supprimé avec succès!!' + data);
      this.getAllDemandeDtos();
      this.demandeDto = new DemandeDto();
    }
  );
}
// deleteDemande(demande: DemandeDto) {
//   this.demandeDto = demande;
// }
deleteDemande(id: number){
    this.demandeService.deleteDemande(id).subscribe( data => {
      console.log(data);
      this.getAllDemandeDtos();
    })
  }



ngOnInit() {
  this.getAllDemandeDtos();
  this.filteredData();
}

async getAllDemandeDtos() {
  await this.demandeService.getDemandes().subscribe(
    (data: DemandeDto[]) => {
      this.demandeDtos = data;
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
    this.datas.sort((a, b) => a.personelDto.nom.localeCompare(b.personelDto.nom));

  }

  this.totalItems = this.datas.length;
  this.totalPages = Math.ceil(this.totalItems / this.itemsPerPage);
  this.filteredData();
  this.getPages();
}
async filterDemandeLists() {
  // Filter les données en fonction de la recherche sur tout les champs de la classe demande
  try {
    if (this.searchText) {
      this.datas = await this.demandeDtos.filter(demande => {
        return  demande.motif.toLowerCase().includes(this.searchText.toLowerCase());
        // || demande.produitDto.codeproduit.toLowerCase().includes(this.searchText.toLowerCase());
      });
    } else {
      this.datas = this.demandeDtos;
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
  this.filteredDemandes = this.datas.slice(startPage, endPage);
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









