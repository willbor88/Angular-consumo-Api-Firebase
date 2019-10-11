import { Component, OnInit } from '@angular/core';
import { HeroeModel } from 'src/app/models/heroe.models';
import { NgForm } from '@angular/forms';
import { HeoresService } from 'src/app/services/heores.service';
import  Swal  from "sweetalert2";
import { Observable } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
@Component({
  selector: 'app-heroe',
  templateUrl: './heroe.component.html',
  styleUrls: ['./heroe.component.css']
})
export class HeroeComponent implements OnInit {


  heroe = new HeroeModel()
  constructor(
    private _heroeService:HeoresService,
    private route:ActivatedRoute

  ) { }

  ngOnInit() {

    const id= this.route.snapshot.paramMap.get('id')//Capturo un string
    
    if (id!=='nuevo') {
      this._heroeService.extraerHeroe(id).subscribe((resp:any)=>{
        this.heroe= resp
        console.log(resp)
        this.heroe.id= id
      })
        
    }
  }

  guardar(form:NgForm){

    if (form.invalid) {
        console.log("Formulario no valido")
        return
            }
            Swal.fire({
              title: 'Espere porfavo',
              text:'Guardando informacion',
              type:'info',
              allowOutsideClick:false
            }) 
            Swal.showLoading();
            let peticion :Observable <any>

            
  if (this.heroe.id) {
   peticion= this._heroeService.actualizarHeroe(this.heroe)
            
  }

  else{
    peticion =this._heroeService.crearHeroe(this.heroe)
   
  }

  peticion.subscribe(resp=>{

    Swal.fire({
  title:this.heroe.nombre,
  text:'Actulizado ',
  type:'success'

    })
  })
    
      

  }



}
