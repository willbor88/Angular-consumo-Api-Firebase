import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HeroeModel } from '../models/heroe.models';
import { map,delay } from "rxjs/operators";


@Injectable({
  providedIn: 'root'
})
export class HeoresService {
  
  url = "https://loggin-app-bcebb.firebaseio.com"//api firebase

  constructor(
    private http:HttpClient
  ) { 
 

  }

  extraerHeroe(id:string){

    return   this.http.get(`${this.url}/heroes/${id}.json`)
  }


  crearHeroe (heroe:HeroeModel){
return this.http.post(`${this.url}/heroes.json`,heroe).pipe(
  map((resp:any)=>{
        heroe.id = resp.name
    return heroe
  })
)

  }

 
  actualizarHeroe (heroe:HeroeModel){

    const heroeTemp={
      ...heroe
    }

    delete heroeTemp.id
    return this.http.put(`${this.url}/heroes/${heroe.id}.json`,heroeTemp)
    
      }

      extraerHeores(){

        return this.http.get(`${this.url}/heroes.json`).pipe(
          map(this.crerArreglo),//Llamar metodo para transformar el objeto en un nuevo arreglo
          delay( 1000)
        )
        
      }

     private crerArreglo(heroesObj:object){
      const heroes:HeroeModel []=[]
        // console.log(heroesObj) //este es un objeto, debe pasarse a un array de objetos 
        //Object---{,heroes: {…}, -LlmzzD7BTvtHYMzzU0-: {…}, -LlnARHUU5EXvyvkyxrj: {…}, -LlnAaVpiCX50xJQvBQb: {…}}
        // Array--- [{…}, {…}, {…}, {…}]

        if (heroesObj==null) {return []}
        
        Object.keys(heroesObj).forEach(Key=>{

          const heroe:HeroeModel=heroesObj[Key]//El key es cada elemento con su posicion
          heroe.id =Key
          heroes.push(heroe)
        })
        
      return heroes

      }

      borrarHeroe(id:string){

     return  this.http.delete(`${this.url}/heroes/${id}.json`)
      }




}
