import { CategorieService } from './../../../../../services/categorie.service';


import { PersonelService } from 'src/app/services/personel.service';
import { PersonelDto } from 'src/app/classes/personel-dto';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SuivieDto } from 'src/app/classes/suivie-dto';
import { ProduitDto } from 'src/app/classes/produit-dto';
import { ProduitService } from 'src/app/services/produit.service';
import { SuivieService } from 'src/app/services/suivie.service';

import { CategorieDto } from 'src/app/classes/categorie-dto';

@Component({
  selector: 'app-create-suivie',
  templateUrl: './create-suivie.component.html',
  styleUrls: ['./create-suivie.component.css']
})
export class CreateSuivieComponent implements OnInit {
isFieldSuivieValid(arg0: string): boolean {
throw new Error('Method not implemented.');
}

categories: CategorieDto[]=[];
produits: ProduitDto[]=[];
Suivies:SuivieDto[]=[];
personels:PersonelDto[]=[];
suivieDto: SuivieDto = new SuivieDto();
   ///a revoir
    constructor(private suivieService:SuivieService,
      private produitService:ProduitService,
      private personelService:PersonelService,
      private SuivieService:SuivieService,
      private categorieService:CategorieService,
      private router: Router) { }

    ngOnInit(): void {
     // this.getProduits();
      this.getProduitSansAvarie();
      this.getPersonels();
      this.getSuivies();
      this.getCategories();
    }

    saveSuivie(){
      this.suivieService.addSuivie(this.suivieDto).subscribe( data =>{
        console.log(data);
        this.goTosuivieList();
      },
      error => console.log(error));
    }

    goTosuivieList(){
      this.router.navigate(['comptable/list-suivie']);
    }

    onSubmit(){
      console.log(this.suivieDto);
      this.saveSuivie();
      console.log(this.suivieDto);
    //  this.produitService.deleteProduit(this.suivieDto.produitDto.id);
   // this.getDeleteProduit();
    }
    getProduits() {
      this.produitService.getProduits()
        .subscribe(data => {
          this.produits = data;
          console.log("Toutes les produits : ", this.produits);
        });
    }
    getCategories() {
      this.categorieService.getCategories()
        .subscribe(data => {
          this.categories = data;
          console.log("Toutes les categories : ", this.categories);
        });
    }
    getProduitSansAvarie() {
      this.produitService.getProduitSansAvaries()
        .subscribe(data => {
          this.produits = data;
          console.log("Toutes les produits non avarie : ", this.produits);
        });
    }


    getDeleteProduit() {
      this.produitService.deleteProduit(this.suivieDto.produitDto.id)
        .subscribe(data => {

        });
    }
    getPersonels() {
      this.personelService.getPersonels()
        .subscribe(data => {
          this.personels = data;
          console.log("Toutes les personels : ", this.personels);
        });
    }

    getSuivies() {
      this.SuivieService.getSuivies()
        .subscribe(data => {
          this.Suivies = data;
          console.log("Toutes les Suivies : ", this.Suivies);
        });
    }

  }

