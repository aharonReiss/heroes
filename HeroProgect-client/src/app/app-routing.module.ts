import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HeroeDetailsComponent } from './components/heroe-details/heroe-details.component';
import { HeroesComponent } from './components/heroes/heroes.component';
import { LoginPageComponent } from './components/login-page/login-page.component';
import { SignInPageComponent } from './components/sign-in-page/sign-in-page.component';
import { CanTrainGuard } from './guard/can-train.guard';
import { GetHeroesByUserId } from './services/hero.service';

const routes: Routes = [
  { path : '', redirectTo: 'login-page', pathMatch: 'full' },
  {path: 'login-page', component: LoginPageComponent},
  {path: 'home/:id',
   component: HeroesComponent,
   canActivate: [CanTrainGuard],
   resolve: {
    getHeroesByUserId : GetHeroesByUserId
  }},
  {path: 'hero-detail/:id',
  canActivate: [CanTrainGuard],
  component: HeroeDetailsComponent},
  {path: 'signup-page', component: SignInPageComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
