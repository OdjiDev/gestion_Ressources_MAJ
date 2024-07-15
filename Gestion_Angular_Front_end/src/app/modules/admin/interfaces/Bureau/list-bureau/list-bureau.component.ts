import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import jsPDF from 'jspdf';
import { BureauDto } from 'src/app/classes/bureau-dto';
import { BureauService } from 'src/app/services/bureau.service';

@Component({
  selector: 'app-list-bureau',
  templateUrl: './list-bureau.component.html',
  styleUrls: ['./list-bureau.component.css']
})
export class ListBureauComponent implements OnInit {

//declaration des variables
@ViewChild('content') pdfTable!: ElementRef;
bureauDtos: BureauDto[] = [];
bureauDto: BureauDto = new BureauDto();
message: any;
style: any;
// Variables pour la pagination
currentPage = 1;
itemsPerPage = 10;
totalItems = 0;
totalPages = 0;
filteredBureaus: BureauDto[] = [];
datas: BureauDto[] = [];
searchText: string = '';
filterBy: string = '';
pages: number[] = [];
constructor(private bureauService: BureauService) {
  this.getAllBureauDtos();
}


delete() {
  this.bureauService.deleteBureau(this.bureauDto.id).subscribe(
    (data) => {
      this.showSuccessMessage('Bureau' + this.bureauDto.id + ' supprimé avec succès!!' + data);
      this.getAllBureauDtos();
      this.bureauDto = new BureauDto();
    }
  );
}
// deleteBureau(bureau: BureauDto) {
//   this.bureauDto = bureau;
// }
deleteBureau(id: number){
    this.bureauService.deleteBureau(id).subscribe( data => {
      console.log(data);
      this.getAllBureauDtos();
    })
  }



ngOnInit() {
  this.getAllBureauDtos();
  this.filteredData();
}

async getAllBureauDtos() {
  await this.bureauService.getBureaus().subscribe(
    (data: BureauDto[]) => {
      this.bureauDtos = data;
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
  }

  this.totalItems = this.datas.length;
  this.totalPages = Math.ceil(this.totalItems / this.itemsPerPage);
  this.filteredData();
  this.getPages();
}
async filterBureauLists() {
  // Filter les données en fonction de la recherche sur tout les champs de la classe bureau
  try {
    if (this.searchText) {
      this.datas = await this.bureauDtos.filter(bureau => {
        return  bureau.nom.toLowerCase().includes(this.searchText.toLowerCase());
      });
    } else {
      this.datas = this.bureauDtos;
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
  this.filteredBureaus = this.datas.slice(startPage, endPage);
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









