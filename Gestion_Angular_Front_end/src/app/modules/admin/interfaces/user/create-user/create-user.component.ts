

import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { User } from 'src/app/classes/user';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-create-user',
  templateUrl: './create-user.component.html',
  styleUrls: ['./create-user.component.css']
})
export class CreateUserComponent implements OnInit {


user: User = new User();
    constructor(private userService:UserService,
      private router: Router) { }

    ngOnInit(): void {
    }

    saveUser(){
      this.userService.addUser(this.user).subscribe( data =>{
        console.log(data);
        this.goTouserList();
      },
      error => console.log(error));
    }

    goTouserList(){
      this.router.navigate(['admin/list-user']);
    }

    onSubmit(){
      console.log(this.user);
      this.saveUser();
    }
  }

