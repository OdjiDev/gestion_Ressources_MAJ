import { SocieteService } from 'src/app/services/societe.service';
import { SocieteDto } from 'src/app/classes/societe-dto';
import { ContratDto } from './../../../../../classes/contrat-dto';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { ContratService } from 'src/app/services/contrat.service';
import { DepartementDto } from 'src/app/classes/departement-dto';
import { DepartementService } from 'src/app/services/departement.service';
@Component({
  selector: 'app-create-contrat',
  templateUrl: './create-contrat.component.html',
  styleUrls: ['./create-contrat.component.css']
})
export class CreateContratComponent implements OnInit {

departements: DepartementDto[]=[];
societes: SocieteDto[]=[];

contratDto: ContratDto = new ContratDto();
    constructor(private contratService:ContratService,
      private departementService:DepartementService,
      private societeService: SocieteService,
      private router: Router) { }

    ngOnInit(): void {
      this.getSocietes();
    }

    saveContrat(){
      this.contratService.addContrat(this.contratDto).subscribe( data =>{
        console.log(data);
        this.goTocontratList();
      },
      error => console.log(error));
    }

    goTocontratList(){
      this.router.navigate(['admin/list-contrat']);
    }

    onSubmit(){
      console.log(this.contratDto);
      this.saveContrat();
    }


    getSocietes() {
      this.societeService.getSocietes()
        .subscribe(data => {
          this.societes = data;
          console.log("Toutes les departemets: ", this.societes);
        });
    }
  }
