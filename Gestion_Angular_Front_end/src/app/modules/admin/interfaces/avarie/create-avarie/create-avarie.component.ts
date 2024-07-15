
import { AvarieDto } from './../../../../../classes/avarie-dto';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { ProduitDto } from 'src/app/classes/produit-dto';
import { AvarieService } from 'src/app/services/avarie.service';
import { ProduitService } from 'src/app/services/produit.service';
@Component({
  selector: 'app-create-avarie',
  templateUrl: './create-avarie.component.html',
  styleUrls: ['./create-avarie.component.css']
})
export class CreateAvarieComponent implements OnInit {

produits: ProduitDto[]=[];

avarieDto: AvarieDto = new AvarieDto();
    constructor(private avarieService:AvarieService,private produitService:ProduitService,
      private router: Router) { }

    ngOnInit(): void {
      this.getProduits();
    }

    saveAvarie(){
      this.avarieService.addAvarie(this.avarieDto).subscribe( data =>{
        console.log(data);
        this.goToavarieList();
      },
      error => console.log(error));
    }

    goToavarieList(){
      this.router.navigate(['admin/listavarie']);
    }

    onSubmit(){
      console.log(this.avarieDto);
      this.saveAvarie();
    }
    getProduits() {
      this.produitService.getProduits()
        .subscribe(data => {
          this.produits = data;
          console.log("Toutes les produits : ", this.produits);
        });
    }

  }
