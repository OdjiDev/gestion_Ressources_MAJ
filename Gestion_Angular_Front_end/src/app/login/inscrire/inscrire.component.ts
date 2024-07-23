import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { RoleDto } from 'src/app/classes/role-dto';
import { User } from 'src/app/classes/user';


import { RoleService } from 'src/app/services/role.service';
import { UserService } from 'src/app/services/user.service';


@Component({
  selector: 'app-inscrire',
  templateUrl: './inscrire.component.html',
  styleUrls: ['./inscrire.component.css']
})
export class InscrireComponent implements OnInit {

roles: RoleDto[]=[];

user: User= new User();
    constructor(private userService:UserService,private roleService:RoleService,
      private router: Router) { }

    ngOnInit(): void {
      this.getRoles();
    }

    saveUser(){
      this.userService.addUser(this.user).subscribe( data =>{
        this.goTouserLogin();
      },
      error => console.log(error));
    }

    goTouserLogin(){
      this.router.navigate(['login']);
    }

    onSubmit(){
      console.log(this.user);
      this.saveUser();

    }
    getRoles() {
      this.roleService.getRoles()
        .subscribe(data => {
          this.roles = data;
          console.log("les Roles ", this.roles);
        });
    }

    userregister() {
      if(this.user.password=this.user.repeatPassord)
        {
          this.saveUser();
        }
        else{
          alert("mot de passe differnt");
        }
      }
  }
