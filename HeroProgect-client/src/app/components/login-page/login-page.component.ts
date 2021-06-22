import { Route } from '@angular/compiler/src/core';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { Subscription } from 'rxjs';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.css']
})
export class LoginPageComponent implements OnInit,OnDestroy {

  loginForm = new FormGroup({
    username : new FormControl('', [Validators.required,Validators.email]),
    password: new FormControl('',[Validators.required])
  })

  constructor(private router: Router, private userService : UserService, private cookiesService: CookieService) { }
  ngOnDestroy(): void {
    this.subscription?.unsubscribe()
  }
  subscription: Subscription | undefined
  ngOnInit(): void {
    if(this.cookiesService.get('token')){
      this.cookiesService.deleteAll()
      window.location.reload()
    }
    
    this.cookiesService.deleteAll()
    this.subscription =  this.userService.LoginSub$.subscribe(
      result => {
        this.cookiesService.set('token', result['token'])
        this.cookiesService.set('userId', result['id'])
        this.router.navigate(['home', result['id']])
      }
    )
  }

  onFormSubmit(){
    if(this.loginForm.invalid){
      return
    }

    this.userService.Login(this.loginForm.value)
  }

  goToSignUpPage(){
    console.log('im here')
    this.router.navigate(['signup-page'])
  }

  get username() { return this.loginForm.get('username') }
  get password() { return this.loginForm.get('password') }

}
