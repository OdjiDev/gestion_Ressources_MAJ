import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DepartementDto } from 'src/app/classes/departement-dto';
import { DepartementService } from 'src/app/services/departement.service';

@Component({
  selector: 'app-create-departement',
  templateUrl: './create-departement.component.html',
  styleUrls: ['./create-departement.component.css']
})
export class CreateDepartementComponent implements OnInit {

departementDto: DepartementDto = new DepartementDto();
    constructor(private departementService:DepartementService,
      private router: Router) { }

    ngOnInit(): void {
    }

    saveDepartement(){
      this.departementService.addDepartement(this.departementDto).subscribe( data =>{
        console.log(data);
        this.goTodepartementList();
      },
      error => console.log(error));
    }

    goTodepartementList(){
      this.router.navigate(['admin/list-departement']);
    }

    onSubmit(){
      console.log(this.departementDto);
      this.saveDepartement();
    }

}
