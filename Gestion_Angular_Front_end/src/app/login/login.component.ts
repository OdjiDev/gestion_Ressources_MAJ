
import { HttpHeaders } from '@angular/common/http';


import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { FormBuilder, FormGroup, Validators } from '@angular/forms'
import { Users } from '../classes/users';
import { LoginuserService } from './loginuser.service';
import { Router } from '@angular/router';
import { UsersDto } from '../classes/users-dto';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],

})
export class LoginComponent implements OnInit {
// usersDto: UsersDto= new UsersDto();
 //users:Users[]=[];

//  user:Users=new Users
// // users:Users[]=[];

//   constructor(private loginuserService:LoginuserService,private router:Router) { }

//   ngOnInit(): void {
//     this.getLoginconsole();
//   }

//   getLoginconsole() {
//     this.loginuserService.getUserss()
//       .subscribe(data => {
//         this.user = data;
//         console.log("Toutes les produits: ", this.user);
//       });
//     }

// usersLogin() {
//   console.log(this.usersDto);
//   console.log(this.usersDto.roleDto);

//   const headers = new HttpHeaders().set('Content-Type', 'application/json');

//   // Send the request with the headers
//   this.loginuserService.loginUsers(this.usersDto)
//     .subscribe(data => {
//       alert("Login successfully");

//  if(this.usersDto.roleDto="personel"){
//   this.router.navigate(['/personel']);
//  }
//  else if(this.usersDto.roleDto="Admin"){
//   this.router.navigate(['/admin']);
//  }
//       this.router.navigate(['']);
//     }, error => {
//       alert("Sorry please enter correct username or password");
//     });
// }
// }


users: Users= new Users();

  constructor(private loginuserService:LoginuserService,private router:Router) { }

  ngOnInit(): void {
  }

usersLogin() {
  console.log(this.users);

  const headers = new HttpHeaders().set('Content-Type', 'application/json');

  // Send the request with the headers
  this.loginuserService.loginUsers(this.users)
    .subscribe(data => {
      console.log(this.users.user_role);

     if(this.users.user_role="admin") {
     this.router.navigate(['/admin']);
     }
     if(this.users.user_role="comptable") {
      //this.router.navigate(['/comptable']);
     }

    else if(this.users.user_role="personel") {
     this.router.navigate(['/personel']);
    }
    alert("Login successfully");

    }, error => {
      alert("Sorry please enter correct username or password");
    });

 }
}
