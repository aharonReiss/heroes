import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http : HttpClient) { }

  LoginS = new Subject<any>();
  LoginSub$ = this.LoginS.asObservable()
  Login(user : any){
    console.log(user.username + ' ' + user.password)
    this.http.post('https://localhost:44399/api/User',{
      "UserName" : user.username,
      "Password" : user.password
    }).subscribe(
      result => {
        this.LoginS.next(result)
      }
    )
  }

  SignUpSub = new Subject<any>();
  SignUpSub$ = this.SignUpSub.asObservable()
  SignUp(user : any){
    console.log(user.name + ' ' + user.password  + ' ' + user.mail)
    this.http.put('https://localhost:44399/api/User',{
      "Name": user.name,
      "Password": user.password,
      "Email": user.email

    }).subscribe(
      result => {
        this.SignUpSub.next(result)
      }
    )
  }
}
