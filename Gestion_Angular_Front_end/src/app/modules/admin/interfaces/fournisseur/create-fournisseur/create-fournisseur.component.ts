import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FournisseurDto } from 'src/app/classes/fournisseur-dto';
import { FournisseurService } from 'src/app/services/fournisseur.service';
@Component({
  selector: 'app-create-fournisseur',
  templateUrl: './create-fournisseur.component.html',
  styleUrls: ['./create-fournisseur.component.css']
})
export class CreateFournisseurComponent implements OnInit {

fournisseurDto: FournisseurDto = new FournisseurDto();
    constructor(private fournisseurService:FournisseurService,
      private router: Router) { }

    ngOnInit(): void {
    }

    saveFournisseur(){
      this.fournisseurService.addFournisseur(this.fournisseurDto).subscribe( data =>{
        console.log(data);
        this.goTofournisseurList();
      },
      error => console.log(error));
    }

    goTofournisseurList(){
      this.router.navigate(['admin/list-fournisseur']);
    }

    onSubmit(){
      console.log(this.fournisseurDto);
      this.saveFournisseur();
    }



  }
