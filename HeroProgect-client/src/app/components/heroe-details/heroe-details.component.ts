import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { HeroService } from 'src/app/services/hero.service';
import { DatePipe } from '@angular/common'

@Component({
  selector: 'app-heroe-details',
  templateUrl: './heroe-details.component.html',
  styleUrls: ['./heroe-details.component.css']
})
export class HeroeDetailsComponent implements OnInit, OnDestroy {
  subscription: Subscription | undefined
  subscription1: Subscription | undefined

  constructor(private heroService:HeroService,private router: ActivatedRoute,private datePipe: DatePipe) { }

  hero: any
  date = new Date()
  canPlay = true
  ngOnInit(): void {
    this.heroService.GetHero(Number(this.router.snapshot.paramMap.get('id')))
    this.subscription =  this.heroService.GetHeroByIdSub$.subscribe(
      result => {
        this.hero = result
        console.log(this.hero)
        console.log(this.datePipe.transform(this.hero.currentDate, 'yyyy-MM-dd'))
        if(this.datePipe.transform(this.hero.currentDate, 'yyyy-MM-dd') === this.datePipe.transform(this.date, 'yyyy-MM-dd')
          && this.hero.timesTrainToday == 5){
            this.canPlay = false
          }
      }
    )
  }

  play(){
    this.heroService.Play(this.hero.id)
    this.subscription1 = this.heroService.playSub$.subscribe(
      result => {
        window.location.reload()
      }
    )
  }

  ngOnDestroy(): void {
    this.subscription?.unsubscribe()
    this.subscription1?.unsubscribe()
  }

}
