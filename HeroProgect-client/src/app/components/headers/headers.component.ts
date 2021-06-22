import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { Subscription } from 'rxjs';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-headers',
  templateUrl: './headers.component.html',
  styleUrls: ['./headers.component.css']
})
export class HeadersComponent implements OnInit,OnDestroy {
  subscription: Subscription | undefined
  isConnected = false
  constructor(private userService: UserService,private cookieService : CookieService,private router: Router) { }


  ngOnInit(): void {
    if(this.cookieService.get('token')){
      this.isConnected = true
    }
    else{
      this.subscription = this.userService.LoginSub$.subscribe(
        result => {
          if(result['token']){
            this.isConnected = true
          }
        }
      )
    }
  }

  loginOrLogout(){
    console.log(this.cookieService.get('token'))
    if(this.cookieService.get('token')){
      this.cookieService.delete('token')
      this.cookieService.delete('userId')
      this.isConnected = false
      this.router.navigate([''])
    }
    console.log(this.cookieService.get('token'))
    //window.location.reload()
    this.subscription?.unsubscribe()
    this.router.navigate([''])
  }

  navigateToHomePage(){
    this.router.navigate(['home', this.cookieService.get('userId')])
  }

  ngOnDestroy(): void {
    this.subscription?.unsubscribe()
  }

}
