import { Component, OnInit } from '@angular/core';
import { HeoresService } from 'src/app/services/heores.service';
import { HeroeModel } from 'src/app/models/heroe.models';
import Swal from 'sweetalert2';
import { delay } from 'rxjs/operators';

@Component({
  selector: 'app-heroes',
  templateUrl: './heroes.component.html',
  styleUrls: ['./heroes.component.css']
})
export class HeroesComponent implements OnInit {
heroes:HeroeModel[]=[]
cargarndo=true
datos= false
  constructor(
    private _heroesService:HeoresService
  ) { }

  ngOnInit() {
    
    this._heroesService.extraerHeores().subscribe(resp=>{
      
     if(resp){
      this.heroes=resp
     
      this.cargarndo=false

     }

     else{
      this.datos=true

     }
     
     })
  }


  borraHeroe(id:string,i:number){
    Swal.fire({

      title:'Borrado de Registro',
      text:'¿Estas seguro de borrar el registro?',
      type:'warning',
      showConfirmButton:true,
      showCloseButton:true,
      showCancelButton:true
    }).then(resp=>{
      if (resp.value) {
        this.heroes.splice(i,1)//Borrar el elemento del arreglo de heroes
    this._heroesService.borrarHeroe(id).subscribe()
      }

    })
    

    

  }

}
