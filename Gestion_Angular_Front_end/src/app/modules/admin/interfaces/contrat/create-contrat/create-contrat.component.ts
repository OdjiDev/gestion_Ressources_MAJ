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

contratDto: ContratDto = new ContratDto();
    constructor(private contratService:ContratService,private departementService:DepartementService,
      private router: Router) { }

    ngOnInit(): void {
    }

    saveContrat(){
      this.contratService.addContrat(this.contratDto).subscribe( data =>{
        console.log(data);
        this.goTocontratList();
      },
      error => console.log(error));
    }

    goTocontratList(){
      this.router.navigate(['admin/listcontrat']);
    }

    onSubmit(){
      console.log(this.contratDto);
      this.saveContrat();
    }
    getDepartemets() {
      this.departementService.getDepartements()
        .subscribe(data => {
          this.departements = data;
          console.log("Toutes les departemets: ", this.departements);
        });
    }

  }
