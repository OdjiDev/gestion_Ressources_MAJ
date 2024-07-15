import { BureauDto } from './../../../../../classes/bureau-dto';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { BureauService } from 'src/app/services/bureau.service';
import { DepartementDto } from 'src/app/classes/departement-dto';
import { DepartementService } from 'src/app/services/departement.service';
@Component({
  selector: 'app-create-bureau',
  templateUrl: './create-bureau.component.html',
  styleUrls: ['./create-bureau.component.css']
})
export class CreateBureauComponent implements OnInit {

departements: DepartementDto[]=[];

bureauDto: BureauDto = new BureauDto();
    constructor(private bureauService:BureauService,private departementService:DepartementService,
      private router: Router) { }

    ngOnInit(): void {
      this.getDepartemets();
    }

    saveBureau(){
      this.bureauService.addBureau(this.bureauDto).subscribe( data =>{
        console.log(data);
        this.goTobureauList();
      },
      error => console.log(error));
    }

    goTobureauList(){
      this.router.navigate(['admin/list-bureau']);
    }

    onSubmit(){
      console.log(this.bureauDto);
      this.saveBureau();
    }
    getDepartemets() {
      this.departementService.getDepartements()
        .subscribe(data => {
          this.departements = data;
          console.log("Toutes les departemets: ", this.departements);
        });
    }

  }
