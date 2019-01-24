import { Component, OnInit } from '@angular/core';
import {FormGroup, FormControl, Validators} from "@angular/forms";
import {Router} from "@angular/router";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm : FormGroup=new FormGroup({
    email:new FormControl(null,[Validators.email,Validators.required]),
    password:new FormControl(null, Validators.required)
  });
  constructor(private _router:Router) { }

  moveToRegister(){
    this._router.navigate(['/register']);
  }

  ngOnInit() {
  }

  login(){
    if (this.loginForm.valid){
      console.log('invalid form');
      return;
    } else {
      console.log(this.loginForm.value);
    }
  }

}
