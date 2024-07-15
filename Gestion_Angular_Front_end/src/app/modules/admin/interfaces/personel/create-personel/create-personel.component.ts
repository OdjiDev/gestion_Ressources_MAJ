import { RoleService } from './../../../../../services/role.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PersonelDto } from 'src/app/classes/personel-dto';
import { RoleDto } from 'src/app/classes/role-dto';
import { PersonelService } from 'src/app/services/personel.service';
@Component({
  selector: 'app-create-personel',
  templateUrl: './create-personel.component.html',
  styleUrls: ['./create-personel.component.css']
})
export class CreatePersonelComponent implements OnInit {
  roles: RoleDto[] = [];
personelDto: PersonelDto = new PersonelDto();
    constructor(private personelService:PersonelService,private roleService:RoleService,
      private router: Router) { }

    ngOnInit(): void {
      this.getRoles();
    }
    getRoles() {
      this.roleService.getRoles()
        .subscribe(data => {
          this.roles = data;
          console.log("Toutes les roles: ", this.roles);
        });
      }

    savePersonel(){
      this.personelService.addPersonel(this.personelDto).subscribe( data =>{
        console.log(data);
        this.goTopersonelList();
      },
      error => console.log(error));
    }

    goTopersonelList(){
      this.router.navigate(['admin/list-personel']);
    }

    onSubmit(){
      console.log(this.personelDto);
      this.savePersonel();
    }



  }

