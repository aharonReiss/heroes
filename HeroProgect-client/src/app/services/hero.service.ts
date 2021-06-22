import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HeroService {

  constructor(private http : HttpClient,private cookieService : CookieService) { }

  public heroes = []

  GetHeroByIdSub = new Subject<any>();
  GetHeroByIdSub$ = this.GetHeroByIdSub.asObservable()
  GetHero(id : any){

    this.http.get('https://localhost:44399/api/Hero/heroId/' + id,{ headers: {Authorization : 'Bearer ' + this.cookieService.get('token')}}).subscribe(
      result => {
        console.log(result)
        this.GetHeroByIdSub.next(result)
      }
    )
  }



  playSub = new Subject<any>();
  playSub$ = this.playSub.asObservable()
  Play(id : number){
    console.log(id + 'sdsdfsdfsdf')
    this.http.post('https://localhost:44399/api/Hero/play/' + Number(id),{},{ headers: {Authorization : 'Bearer ' + this.cookieService.get('token')}}).subscribe(
      result => {
        console.log(result)
        this.playSub.next(result)
      }
    )
  }


  AddHeroSub = new Subject<any>();
  AddHeroSub$ = this.AddHeroSub.asObservable()
  AddHero(form : any){
    console.log(form)
    this.http.put('https://localhost:44399/api/Hero',{
      "Name": form.name,
      "GuidId": Number(this.cookieService.get('userId')),
      "SuitColor": form.suitColor,
      "StartingPower": Number(form.startingPower),
      "Ability": form.ability
    },{ headers: {Authorization : 'Bearer ' + this.cookieService.get('token')}}).subscribe(
      result => {
        this.AddHeroSub.next(result)
      }
    )
  }

}


@Injectable()
export class GetHeroesByUserId implements Resolve<any> {
  constructor(private http : HttpClient,private cookieService: CookieService) {}

  resolve(route: ActivatedRouteSnapshot) {
    const id = route.params['id'];
    console.log(id)
    return this.http.get('https://localhost:44399/api/Hero/' + id,{ headers: {Authorization : 'Bearer ' + this.cookieService.get('token')}});
  }
}


