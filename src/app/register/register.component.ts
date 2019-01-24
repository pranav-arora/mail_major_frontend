import { Component, OnInit } from '@angular/core';
import {FormGroup, Validators, FormControl} from "@angular/forms";
import {Router} from "@angular/router";
import {UserService} from "../service/user/user.service";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  registerForm:FormGroup = new FormGroup({
    email:new FormControl(null,[Validators.email,Validators.required]),
    username:new FormControl(null,Validators.required),
    password:new FormControl(null,Validators.required),
    cpass:new FormControl(null,Validators.required)
  })
  constructor(private _router:Router, private userService: UserService) { }

  ngOnInit() {
  }

  moveToLogin(){
    this._router.navigate(['/login']);
  }

  register(){
    if (!this.registerForm.valid || this.registerForm.get('password').value != this.registerForm.get('cpass').value){
      console.log('invalid form');
      console.log(this.registerForm.get('password').value != this.registerForm.get('cpass').value);
      return;
    }
      this.userService.register(this.registerForm.value).subscribe(data=>{
        console.log('success');
        this._router.navigate(['/login']);
      });

  }

}
