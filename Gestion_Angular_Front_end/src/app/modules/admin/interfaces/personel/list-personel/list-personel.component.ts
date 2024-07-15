
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import jsPDF from 'jspdf';
import {PersonelDto } from 'src/app/classes/personel-dto';
import { RoleDto } from 'src/app/classes/role-dto';
import {PersonelService } from 'src/app/services/personel.service';

@Component({
  selector: 'app-list-personel',
  templateUrl: './list-personel.component.html',
  styleUrls: ['./list-personel.component.css']
})
export class ListPersonelComponent implements OnInit {


  //declaration des variables
  @ViewChild('content') pdfTable!: ElementRef;
  personelDtos: PersonelDto[] = [];
  personelDto: PersonelDto = new PersonelDto();
  message: any;
  style: any;
  // Variables pour la pagination
  currentPage = 1;
  itemsPerPage = 10;
  totalItems = 0;
  totalPages = 0;
  filteredPersonels: PersonelDto[] = [];
  datas: PersonelDto[] = [];
  searchText: string = '';
  filterBy: string = '';
  pages: number[] = [];
  constructor(private personelService: PersonelService) {
    this.getAllPersonelDtos();
  }


  delete() {
    this.personelService.deletePersonel(this.personelDto.id).subscribe(
      (data) => {
        this.showSuccessMessage('Personel' + this.personelDto.id + ' supprimé avec succès!!' + data);
        this.getAllPersonelDtos();
        this.personelDto = new PersonelDto();
      }
    );
  }
  // deletePersonel(personel: PersonelDto) {
  //   this.personelDto = personel;
  // }
  deletePersonel(id: number){
      this.personelService.deletePersonel(id).subscribe( data => {
        console.log(data);
        this.getAllPersonelDtos();
      })
    }



  ngOnInit() {
    this.getAllPersonelDtos();
    this.filteredData();
  }

  async getAllPersonelDtos() {
    await this.personelService.getPersonels().subscribe(
      (data: PersonelDto[]) => {
        this.personelDtos = data;
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
      this.datas.sort((a, b) => a.prenom.localeCompare(b.prenom))
      this.datas.sort((a, b) => a.dateDeNaissance.localeCompare(b.dateDeNaissance))
      this.datas.sort((a, b) => a.lieuDeNaissance.localeCompare(b.lieuDeNaissance));

    }

    this.totalItems = this.datas.length;
    this.totalPages = Math.ceil(this.totalItems / this.itemsPerPage);
    this.filteredData();
    this.getPages();
  }
  async filterPersonelLists() {
    // Filter les données en fonction de la recherche sur tout les champs de la classe personel
    try {
      if (this.searchText) {
        this.datas = await this.personelDtos.filter(personel => {
          return  personel.nom.toLowerCase().includes(this.searchText.toLowerCase())
           || personel.prenom.toLowerCase().includes(this.searchText.toLowerCase())
           || personel.dateDeNaissance.toLowerCase().includes(this.searchText.toLowerCase())
           || personel.lieuDeNaissance.toLowerCase().includes(this.searchText.toLowerCase());
        });
      } else {
        this.datas = this.personelDtos;
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
    this.filteredPersonels = this.datas.slice(startPage, endPage);
    this.getPages();
  }
  generatePDF() {
    const pdf = new jsPDF('p', 'pt', 'a4');
    pdf.html(this.pdfTable.nativeElement, {
      callback: (pdf) => {
        pdf.save('personels.pdf');
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









