import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { HeroService } from 'src/app/services/hero.service';

@Component({
  selector: 'app-heroes',
  templateUrl: './heroes.component.html',
  styleUrls: ['./heroes.component.css']
})
export class HeroesComponent implements OnInit,OnDestroy {

  constructor(private route: ActivatedRoute,private heroService: HeroService,private router:Router) { }

  subscription: Subscription | undefined
  subscription1: Subscription | undefined
  heroes : any
  displayForm = false

  heroForm = new FormGroup({
    name : new FormControl('', [Validators.required]),
    suitColor: new FormControl('',[Validators.required]),
    startingPower: new FormControl('',[Validators.required]),
    ability : new FormControl('',[Validators.required])
  })

  ngOnInit(): void {
   this.subscription =  this.route.data.subscribe(
      data => {
        console.log(data['getHeroesByUserId'])
        this.heroService.heroes = data['getHeroesByUserId']
        this.heroes = data['getHeroesByUserId']
      }
    )
  }

  displayFormNone(){
    this.displayForm = false
  }
  goToHeroDtail(id:any){
    this.router.navigate(['hero-detail',id])
  }

  onFormSubmit(){
    if(this.heroForm.invalid){
      return
    }
    this.displayForm = false
    this.heroService.AddHero(this.heroForm.value)
    this.subscription1 = this.heroService.AddHeroSub$.subscribe(
      result => {
        window.location.reload()
        console.log(result)
      }
    )
  }

  get name() { return this.heroForm.get('name') }
  get suitColor() { return this.heroForm.get('suitColor') }
  get startingPower() { return this.heroForm.get('startingPower') }
  get ability() { return this.heroForm.get('ability') }


  ngOnDestroy(): void {
    this.subscription?.unsubscribe()
    this.subscription1?.unsubscribe()
  }

}
