import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { HeroService } from 'src/app/services/hero.service';

@Component({
  selector: 'app-add-hero-form',
  templateUrl: './add-hero-form.component.html',
  styleUrls: ['./add-hero-form.component.css']
})
export class AddHeroFormComponent implements OnInit,OnDestroy {

  constructor(private heroService: HeroService) { }


  displayForm = false
  subscription1: Subscription | undefined
  heroForm = new FormGroup({
    name : new FormControl('', [Validators.required]),
    suitColor: new FormControl('',[Validators.required]),
    startingPower: new FormControl('',[Validators.required]),
    ability : new FormControl([Validators.required])
  })

  ngOnInit(): void {
    this.ability?.setValue('defender')
  }

  displayFormNone(){
    this.displayForm = false
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
    this.subscription1?.unsubscribe()
  }
}
