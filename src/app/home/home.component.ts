import { Component, OnInit } from '@angular/core';
import {UserService} from "../service/user/user.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  public user:any;

  constructor(private userService: UserService, private _router: Router) {
    this.userService.user().subscribe(data => {
      this.user = data;
      console.log(this.user);
    },  err => {
      console.log(err);
      this._router.navigate(['/login']);
    })
  }

  ngOnInit() {
  }

  logout() {
    this.userService.logout().subscribe(data => {
      console.log('logout success');
      this._router.navigate(['/login']);
    }, err => {
      console.log(err);
    })
  }


}
