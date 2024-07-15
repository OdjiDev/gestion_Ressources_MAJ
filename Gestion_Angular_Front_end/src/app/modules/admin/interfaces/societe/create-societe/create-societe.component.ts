
import { SocieteDto } from './../../../../../classes/societe-dto';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { SocieteService } from 'src/app/services/societe.service';

@Component({
  selector: 'app-create-societe',
  templateUrl: './create-societe.component.html',
  styleUrls: ['./create-societe.component.css']
})
export class CreateSocieteComponent implements OnInit {


societeDto: SocieteDto = new SocieteDto();
    constructor(private societeService:SocieteService,
      private router: Router) { }

    ngOnInit(): void {
    }

    saveSociete(){
      this.societeService.addSociete(this.societeDto).subscribe( data =>{
        console.log(data);
        this.goTosocieteList();
      },
      error => console.log(error));
    }

    goTosocieteList(){
      this.router.navigate(['admin/listsociete']);
    }

    onSubmit(){
      console.log(this.societeDto);
      this.saveSociete();
    }
  }

