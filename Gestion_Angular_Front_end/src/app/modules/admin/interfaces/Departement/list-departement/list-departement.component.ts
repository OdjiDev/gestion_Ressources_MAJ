import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { PDFDocument } from 'pdf-lib';
import { Router } from '@angular/router';
import jsPDF from 'jspdf';
import { DepartementDto } from 'src/app/classes/departement-dto';
import { DepartementService } from 'src/app/services/departement.service';

@Component({
  selector: 'app-list-departement',
  templateUrl: './list-departement.component.html',
  styleUrls: ['./list-departement.component.css']
})
export class ListDepartementComponent implements OnInit {

//declaration des variables
@ViewChild('content') pdfTable!: ElementRef;
departementDtos: DepartementDto[] = [];
departementDto: DepartementDto = new DepartementDto();
message: any;
style: any;
// Variables pour la pagination
currentPage = 1;
itemsPerPage = 10;
totalItems = 0;
totalPages = 0;
filteredDepartements: DepartementDto[] = [];
datas: DepartementDto[] = [];
searchText: string = '';
filterBy: string = '';
pages: number[] = [];
constructor(private departementService: DepartementService) {
  this.getAllDepartementDtos();
}


delete() {
  this.departementService.deleteDepartement(this.departementDto.id).subscribe(
    (data) => {
      this.showSuccessMessage('Departement' + this.departementDto.id + ' supprimé avec succès!!' + data);
      this.getAllDepartementDtos();
      this.departementDto = new DepartementDto();
    }
  );
}
// deleteDepartent(departement: DepartementDto) {
//   this.departementDto = departement;
// }
deleteDepartement(id: number){
  this.departementService.deleteDepartement(id).subscribe( data => {
    console.log(data);
    this.getAllDepartementDtos();
  })
}

ngOnInit() {
  this.getAllDepartementDtos();
  this.filteredData();
}

async getAllDepartementDtos() {
  await this.departementService.getDepartements().subscribe(
    (data: DepartementDto[]) => {
      this.departementDtos = data;
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
  } else if (this.filterBy == 'libelle') {
    this.datas.sort((a, b) => a.nom.localeCompare(b.nom));
  }

  this.totalItems = this.datas.length;
  this.totalPages = Math.ceil(this.totalItems / this.itemsPerPage);
  this.filteredData();
  this.getPages();
}
async filterDepartementLists() {
  // Filter les données en fonction de la recherche sur tout les champs de la classe departement
  try {
    if (this.searchText) {
      this.datas = await this.departementDtos.filter(departement => {
        return departement.code.toLowerCase().includes(this.searchText.toLowerCase())
          || departement.nom.toLowerCase().includes(this.searchText.toLowerCase());
      });
    } else {
      this.datas = this.departementDtos;
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
  this.filteredDepartements = this.datas.slice(startPage, endPage);
  this.getPages();
}
generatePDF() {
  const pdf = new jsPDF('p', 'pt', 'a4');
  pdf.html(this.pdfTable.nativeElement, {
    callback: (pdf) => {
      pdf.save('Departements.pdf');
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


















//   departementDtos: DepartementDto[] = [];

//   constructor(private departementService: DepartementService,
//     private router: Router) { }

//   ngOnInit(): void {
//     this.getDepartements();
//   }

//   private getDepartements(){
//     this.departementService.getDepartements().subscribe(data => {
//       this.departementDtos = data;
//     });
//   }
// onCreateDepartement()
// {
//   this.router.navigate(['admin/adddepartement']);
// }
//   departementDetails(id: number){
//     this.router.navigate(['admin/detailsdepartement', id]);
//   }

//   updateDepartement(id: number){
//     this.router.navigate(['admin/updatedepartement', id]);
//   }

//   deleteDepartement(id: number){
//     this.departementService.deleteDepartement(id).subscribe( data => {
//       console.log(data);
//       this.getDepartements();
//     })
//   }
// }





