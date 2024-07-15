import { Component, OnInit } from '@angular/core';
import { User } from './user';
import {  NgForm }from '@angular/forms';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],


})
export class RegisterComponent implements OnInit {




user:User = new User();
  //registerForm!: FormGroup; // Définir une instance FormGroup



 errorMsg: string="";

  constructor() { }

  ngOnInit(): void {
  }
  saveData(registerForm:NgForm) {
    console.log("soumis")
    console.log(registerForm.form)
    console.log('valeurs:',JSON.stringify(registerForm.value));
    }

}
