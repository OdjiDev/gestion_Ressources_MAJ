import { BureauDto } from './../../../../../classes/bureau-dto';
import { BureauService } from './../../../../../services/bureau.service';

import { PersonelService } from 'src/app/services/personel.service';
import { PersonelDto } from 'src/app/classes/personel-dto';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { ProduitDto } from 'src/app/classes/produit-dto';
import { ProduitService } from 'src/app/services/produit.service';
import { ReparationService } from 'src/app/services/reparation.service';
import { ReparationDto } from 'src/app/reparation-dto';

@Component({
  selector: 'app-create-reparation',
  templateUrl: './create-reparation.component.html',
  styleUrls: ['./create-reparation.component.css']
})
export class CreateReparationComponent implements OnInit {


produits: ProduitDto[]=[];
bureaus:BureauDto[]=[];
personels:PersonelDto[]=[];
reparationDto: ReparationDto = new ReparationDto();
    constructor(private reparationService:ReparationService,
      private produitService:ProduitService,
      private personelService:PersonelService,
      private bureauService:BureauService,
      private router: Router) { }

    ngOnInit(): void {
      this.getProduits();
      this.getPersonels();
      this.getBureaus();
    }

    savereparation(){
      this.reparationService.addReparation(this.reparationDto).subscribe( data =>{
        console.log(data);
        this.goToreparationList();
      },
      error => console.log(error));
    }

    goToreparationList(){
      this.router.navigate(['admin/list-reparation']);
    }

    onSubmit(){
      console.log(this.reparationDto);
      this.savereparation();
    //  this.produitService.deleteProduit(this.reparationDto.produitDto.id);
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
      this.produitService.deleteProduit(this.reparationDto.produitDto.id)
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

