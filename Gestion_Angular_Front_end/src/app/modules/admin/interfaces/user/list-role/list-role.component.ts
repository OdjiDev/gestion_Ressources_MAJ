import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { PDFDocument } from 'pdf-lib';
import { Router } from '@angular/router';
import jsPDF from 'jspdf';
import { RoleDto } from 'src/app/classes/role-dto';
import { RoleService } from 'src/app/services/role.service';



@Component({
  selector: 'app-list-roledto',
  templateUrl: './list-role.component.html',
  styleUrls: ['./list-role.component.css']
})
export class ListRoleComponent implements OnInit {

//declaration des variables
@ViewChild('content') pdfTable!: ElementRef;
roledtos: RoleDto[] = [];
roledto: RoleDto = new RoleDto();
message: any;
style: any;
// Variables pour la pagination
currentPage = 1;
itemsPerPage = 10;
totalItems = 0;
totalPages = 0;
filteredRoleDtos: RoleDto[] = [];
datas: RoleDto[] = [];
searchText: string = '';
filterBy: string = '';
pages: number[] = [];
constructor(private roleService: RoleService) {
  this.getAllRoles();
}


delete() {
//   this.roledtoService.deleteRole(this.roledto.roledtoId).subscribe(
//     (data) => {
//       this.showSuccessMessage('Role' + this.roledto.id + ' supprimé avec succès!!' + data);
//       this.getAllRoles();
//       this.roledto = new Role();
//     }
//   );
 }
deleteRole(roleDto: RoleDto) {
  this.roledto = roleDto;
  //this.delete();
}

ngOnInit() {
  this.getAllRoles();
  this.filteredData();
}

async getAllRoles() {
  await this.roleService.getRoles().subscribe(
    (data: RoleDto[]) => {
      this.roledtos = data;
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
async filterRoleLists() {
  // Filter les données en fonction de la recherche sur tout les champs de la classe roledto
  try {
    if (this.searchText) {
      this.datas = await this.roledtos.filter(roledto => {
        return roledto.nom.toLowerCase().includes(this.searchText.toLowerCase())
          //|| roledto.roledto_roledto.toLowerCase().includes(this.searchText.toLowerCase());
      });
    } else {
      this.datas = this.roledtos;
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
  this.filteredRoleDtos = this.datas.slice(startPage, endPage);
  this.getPages();
}
generatePDF() {
  const pdf = new jsPDF('p', 'pt', 'a4');
  pdf.html(this.pdfTable.nativeElement, {
    callback: (pdf) => {
      pdf.save('Roles.pdf');
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













