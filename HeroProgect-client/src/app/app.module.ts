import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { CookieService } from 'ngx-cookie-service';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SignInPageComponent } from './components/sign-in-page/sign-in-page.component';
import { LoginPageComponent } from './components/login-page/login-page.component';
import { HeadersComponent } from './components/headers/headers.component';
import { HeroesComponent } from './components/heroes/heroes.component';
import { HeroeDetailsComponent } from './components/heroe-details/heroe-details.component';
import { GetHeroesByUserId } from './services/hero.service';
import { CanTrainGuard } from './guard/can-train.guard';
import { AddHeroFormComponent } from './components/add-hero-form/add-hero-form.component';
import { DatePipe } from '@angular/common'

@NgModule({
  declarations: [
    AppComponent,
    SignInPageComponent,
    LoginPageComponent,
    HeadersComponent,
    HeroesComponent,
    HeroeDetailsComponent,
    AddHeroFormComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  providers: [CookieService,GetHeroesByUserId,CanTrainGuard,DatePipe],
  bootstrap: [AppComponent]
})
export class AppModule { }
