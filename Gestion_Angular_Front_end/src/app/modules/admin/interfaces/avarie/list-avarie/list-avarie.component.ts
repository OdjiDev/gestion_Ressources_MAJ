
  import { PersonelService } from 'src/app/services/personel.service';
  import { PersonelDto } from 'src/app/classes/personel-dto';
  import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';

  import { Router } from '@angular/router';

  import { AvarieDto } from 'src/app/classes/avarie-dto';
  import { ProduitDto } from 'src/app/classes/produit-dto';
  import { AvarieService } from 'src/app/services/avarie.service';
  import { ProduitService } from 'src/app/services/produit.service';
  import jsPDF from 'jspdf';

  @Component({
    selector: 'app-list-avarie',
    templateUrl: './list-avarie.component.html',
    styleUrls: ['./list-avarie.component.css']
  })
  export class ListAvarieComponent implements OnInit {


  //declaration des variables
  @ViewChild('content') pdfTable!: ElementRef;
  avarieDtos: AvarieDto[] = [];
  avarieDto: AvarieDto = new AvarieDto();
  message: any;
  style: any;
  // Variables pour la pagination
  currentPage = 1;
  itemsPerPage = 10;
  totalItems = 0;
  totalPages = 0;
  filteredAvaries: AvarieDto[] = [];
  datas: AvarieDto[] = [];
  searchText: string = '';
  filterBy: string = '';
  pages: number[] = [];
  constructor(private avarieService: AvarieService) {
    this.getAllAvarieDtos();
  }


  delete() {
    this.avarieService.deleteAvarie(this.avarieDto.id).subscribe(
      (data) => {
        this.showSuccessMessage('Avarie' + this.avarieDto.id + ' supprimé avec succès!!' + data);
        this.getAllAvarieDtos();
        this.avarieDto = new AvarieDto();
      }
    );
  }
  // deleteAvarie(avarie: AvarieDto) {
  //   this.avarieDto = avarie;
  // }
  deleteAvarie(id: number){
      this.avarieService.deleteAvarie(id).subscribe( data => {
        console.log(data);
        this.getAllAvarieDtos();
      })
    }



  ngOnInit() {
    this.getAllAvarieDtos();
    this.filteredData();
  }

  async getAllAvarieDtos() {
    await this.avarieService.getAvaries().subscribe(
      (data: AvarieDto[]) => {
        this.avarieDtos = data;
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
      this.datas.sort((a, b) => a.produitDto.codeproduit.localeCompare(b.produitDto.codeproduit));

    }

    this.totalItems = this.datas.length;
    this.totalPages = Math.ceil(this.totalItems / this.itemsPerPage);
    this.filteredData();
    this.getPages();
  }
  async filterAvarieLists() {
    // Filter les données en fonction de la recherche sur tout les champs de la classe avarie
    try {
      if (this.searchText) {
        this.datas = await this.avarieDtos.filter(avarie => {
          return  avarie.motif.toLowerCase().includes(this.searchText.toLowerCase());
          // || avarie.produitDto.codeproduit.toLowerCase().includes(this.searchText.toLowerCase());
        });
      } else {
        this.datas = this.avarieDtos;
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
    this.filteredAvaries = this.datas.slice(startPage, endPage);
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









