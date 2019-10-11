import { NgModule } from '@angular/core';
import { Routes, RouterModule } from "@angular/router";
import { HeroesComponent } from './pages/heroes/heroes.component';
import { HeroeComponent } from './pages/heroe/heroe.component';

const routes:Routes=[

{path:'Heroes', component:HeroesComponent},
{path:'Heroe/:id', component:HeroeComponent},
{path:'**', pathMatch:'full',redirectTo:'Heroes'}


]


@NgModule({
  
  imports: [
    RouterModule.forRoot(routes)
  ],
  exports:[
    RouterModule

  ]
})
export class AppRoutinModule { }
