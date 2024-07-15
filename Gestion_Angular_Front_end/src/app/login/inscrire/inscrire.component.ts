import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { RoleDto } from 'src/app/classes/role-dto';
import { UsersDto } from 'src/app/classes/users-dto';
import { RoleService } from 'src/app/services/role.service';
import { UsersService } from 'src/app/services/users.service';

@Component({
  selector: 'app-inscrire',
  templateUrl: './inscrire.component.html',
  styleUrls: ['./inscrire.component.css']
})
export class InscrireComponent implements OnInit {

roles: RoleDto[]=[];

usersDto: UsersDto = new UsersDto();
    constructor(private usersService:UsersService,private roleService:RoleService,
      private router: Router) { }

    ngOnInit(): void {
      this.getRoles();
    }

    saveUsers(){
      this.usersService.addUsers(this.usersDto).subscribe( data =>{
        this.goTousersLogin();
      },
      error => console.log(error));
    }

    goTousersLogin(){
      this.router.navigate(['login']);
    }

    onSubmit(){
      console.log(this.usersDto);
      this.saveUsers();
      
    }
    getRoles() {
      this.roleService.getRoles()
        .subscribe(data => {
          this.roles = data;
          console.log("les Roles ", this.roles);
        });
    }

    usersregister() {
      if(this.usersDto.passwordDto=this.usersDto.repeatpasswordDto)
        {
          this.saveUsers();
        }
        else{
          alert("mot de passe differnt");
        }
      }
  }
