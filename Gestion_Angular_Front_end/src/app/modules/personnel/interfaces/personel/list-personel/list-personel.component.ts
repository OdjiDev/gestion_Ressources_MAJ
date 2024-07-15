
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {PersonelDto } from 'src/app/classes/personel-dto';
import { RoleDto } from 'src/app/classes/role-dto';
import {PersonelService } from 'src/app/services/personel.service';

@Component({
  selector: 'app-list-personel',
  templateUrl: './list-personel.component.html',
  styleUrls: ['./list-personel.component.css']
})
export class ListPersonelComponent implements OnInit {

 personelDtos:PersonelDto[] = [];

  constructor(private personelService:PersonelService,
    private router: Router) { }

  ngOnInit(): void {
    this.getPersonels();
  }

  private getPersonels(){
    this.personelService.getPersonels().subscribe(data => {
      this.personelDtos = data;
    });
  }
onCreatePersonel()
{
  this.router.navigate(['admin/addpersonel']);
}
 personelDetails(id: number){
    this.router.navigate(['detailspersonel', id]);
  }

  updatePersonel(id: number){
    this.router.navigate(['updatepersonel', id]);
  }

  deletePersonel(id: number){
    this.personelService.deletePersonel(id).subscribe( data => {
      console.log(data);
      this.getPersonels();
    })
  }
}
