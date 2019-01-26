import { Component, OnInit } from '@angular/core';
import {FormGroup, FormControl, Validators} from "@angular/forms";
import {Router} from "@angular/router";
import {UserService} from "../service/user/user.service";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm : FormGroup=new FormGroup({
    username:new FormControl(null,Validators.required),
    password:new FormControl(null, Validators.required)
  });
  constructor(private _router:Router, private userService: UserService) { }

  moveToRegister(){
    this._router.navigate(['/register']);
  }

  ngOnInit() {
  }

  login(){
    if (!this.loginForm.valid){
      console.log('invalid form', this.loginForm.value);
      return;
    } else {
      this.userService.login(JSON.stringify(this.loginForm.value)).subscribe(data => {
        console.log(data);
        this._router.navigate(['/home']);
      }, err => {
        console.log(err);
      })
    }
  }

}
