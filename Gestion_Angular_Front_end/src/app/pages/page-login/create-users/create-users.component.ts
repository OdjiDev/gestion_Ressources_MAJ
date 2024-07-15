import { Component, OnInit } from '@angular/core';
import { Users } from '../../../classes/users';
import { Router } from '@angular/router';
import { LoginuserService } from '../../../login/loginuser.service';
@Component({
  selector: 'app-create-users',
  templateUrl: './create-users.component.html',
  styleUrls: ['./create-users.component.css']
})
export class CreateUsersComponent implements OnInit {


  users: Users = {
    userId: "", password: "",
    repeatpassord: "",
    user_role: ""
  };

  constructor(private loginuserService: LoginuserService, private router: Router){}
onSubmit() {
  this.router.navigate(['/produit']);
}



  ngOnInit(): void {
  }

}
