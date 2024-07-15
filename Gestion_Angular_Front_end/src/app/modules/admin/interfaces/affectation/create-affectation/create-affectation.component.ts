import { BureauDto } from './../../../../../classes/bureau-dto';
import { BureauService } from './../../../../../services/bureau.service';

import { PersonelService } from 'src/app/services/personel.service';
import { PersonelDto } from 'src/app/classes/personel-dto';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AffectationDto } from 'src/app/classes/affectation-dto';
import { ProduitDto } from 'src/app/classes/produit-dto';
import { ProduitService } from 'src/app/services/produit.service';
import { AffectationService } from 'src/app/services/affectation.service';

@Component({
  selector: 'app-create-affectation',
  templateUrl: './create-affectation.component.html',
  styleUrls: ['./create-affectation.component.css']
})
export class CreateAffectationComponent implements OnInit {


produits: ProduitDto[]=[];
bureaus:BureauDto[]=[];
personels:PersonelDto[]=[];
affectationDto: AffectationDto = new AffectationDto();
    constructor(private affectationService:AffectationService,
      private produitService:ProduitService,
      private personelService:PersonelService,
      private bureauService:BureauService,
      private router: Router) { }

    ngOnInit(): void {
      this.getProduits();
      this.getPersonels();
      this.getBureaus();
    }

    saveaffectation(){
      this.affectationService.addAffectation(this.affectationDto).subscribe( data =>{
        console.log(data);
        this.goToaffectationList();
      },
      error => console.log(error));
    }

    goToaffectationList(){
      this.router.navigate(['admin/list-affectation']);
    }

    onSubmit(){
      console.log(this.affectationDto);
      this.saveaffectation();
    //  this.produitService.deleteProduit(this.affectationDto.produitDto.id);
    this.getDeleteProduit();
    }
    getProduits() {
      this.produitService.getProduits()
        .subscribe(data => {
          this.produits = data;
          console.log("Toutes les produits : ", this.produits);
        });
    }
    getDeleteProduit() {
      this.produitService.deleteProduit(this.affectationDto.produitDto.id)
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

    getBureaus() {
      this.bureauService.getBureaus()
        .subscribe(data => {
          this.bureaus = data;
          console.log("Toutes les bureaus : ", this.bureaus);
        });
    }

  }

