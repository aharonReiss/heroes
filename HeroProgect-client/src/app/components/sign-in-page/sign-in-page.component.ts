import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { Subscription } from 'rxjs';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-sign-in-page',
  templateUrl: './sign-in-page.component.html',
  styleUrls: ['./sign-in-page.component.css']
})
export class SignInPageComponent implements OnInit,OnDestroy {

  loginForm = new FormGroup({
    name : new FormControl('', [Validators.required]),
    password: new FormControl('',[Validators.required]),
    email: new FormControl('',[Validators.required,Validators.email])
  })
  constructor(private route: Router,private userService: UserService, private cookieService : CookieService) { }
  subscription: Subscription | undefined
  ngOnDestroy(): void {
    this.subscription?.unsubscribe()
  }

  ngOnInit(): void {
  }

  onFormSubmit(){
    if(this.loginForm.invalid){
      return
    }

    this.userService.SignUp(this.loginForm.value)
    this.subscription = this.userService.SignUpSub$.subscribe(
      result => {
        if(result['email']){
          this.route.navigate(['login-page'])
        }
        console.log(result)
      }
    )
  }

  goToSignUpPage(){
    console.log('im here')
    this.route.navigate(['login-page'])
  }

  get username() { return this.loginForm.get('name') }
  get password() { return this.loginForm.get('password') }
  get email() { return this.loginForm.get('email') }
}
