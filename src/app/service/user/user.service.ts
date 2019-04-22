import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {HttpHeaders} from "@angular/common/http";
import {AppUrl} from "../../app-url";

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http:HttpClient) { }

  register(body:any) {
    console.log('inside register', body);
    return this.http.post('http://127.0.0.1:3000/users/register', body,{
      observe:'body',
      headers:new HttpHeaders().append('Content-Type','application/json')
    });
  }

  login(body:any) {
    console.log('inside login', body);
    return this.http.post('http://127.0.0.1:3000/users/login', body,{
      observe:'body',
      withCredentials: true,
      headers:new HttpHeaders().append('Content-Type','application/json')
    });
  }

  logout() {
    return this.http.post('http://127.0.0.1:3000/auth/logout',{
      observe:'body',
      withCredentials: true,
      headers:new HttpHeaders().append('Content-Type','application/json')
    },{responseType: 'text'});
  }

  user() {
    return this.http.get('http://127.0.0.1:3000/users/home', {
      observe:'body',
      withCredentials: true,
      headers:new HttpHeaders().append('Content-Type','application/json')
    });
  }

  googleLogin() {
    return this.http.get('http://localhost:3000/auth/google',{
      observe:'body',
      withCredentials: true,
      headers:new HttpHeaders().append('Content-Type','application/json')
    })
  }

  getUser() {
    return this.http.get(AppUrl.USER(), {
      observe:'body',
      withCredentials: true,
      headers:new HttpHeaders().append('Content-Type','application/json')
    })
  }
  getMails(id?) {
    if (id) {return this.http.get(AppUrl.MAILS(id), {
      observe:'body',
      withCredentials: true,
      headers:new HttpHeaders().append('Content-Type','application/json')
    })} else
      return this.http.get(AppUrl.MAILS(), {
        observe:'body',
        withCredentials: true,
        headers:new HttpHeaders().append('Content-Type','application/json')
      })
  }

  getLabels() {
    return this.http.get(AppUrl.LABELS(), {
      observe:'body',
      withCredentials: true,
      headers:new HttpHeaders().append('Content-Type','application/json')
    })
  }
  getLabel() {
    return this.http.get(AppUrl.LABEL(), {
      observe:'body',
      withCredentials: true,
      headers:new HttpHeaders().append('Content-Type','application/json')
    })
  }
  getMessages() {
    // https://www.googleapis.com/gmail/v1/users/userId/messages
  }
  postQuery(data) {
    return this.http.post(AppUrl.QUERRY(),{'query': data}, {
      observe:'body',
      withCredentials: true,
      headers:new HttpHeaders().append('Content-Type','application/json')
    })
  }
}
