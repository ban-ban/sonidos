import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { Refresher, reorderArray } from 'ionic-angular';
import { ANIMALES } from '../../data/data.animales';
import { Animal} from '../../interfaces/animal.interface';


@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  animales: Animal[]=[];
  audio = new Audio();	
  audioTiempo : any;
  ordenando:boolean=false;

  constructor(public navCtrl: NavController) {

  this.animales=ANIMALES.slice(0);	

  }

  reproducir (animal:Animal) {

  	console.log(animal);
  	//reinitialise the timeout
  	this.pausar_audio(animal); 
  	
  	//test if still playing
  	if (animal.reproduciendo) {
  		animal.reproduciendo=false;
  		return;
  	}

  	
  	this.audio.src= animal.audio;

  	this.audio.load();
  	this.audio.play();

  	animal.reproduciendo=true;
  	//qn: ca modifie l'animal local ou l'animal de home.html (item)?
  	this.audioTiempo=setTimeout(()=>animal.reproduciendo=false, animal.duracion*1000);
  }

  private pausar_audio (animalSel:Animal){
  	clearTimeout(this.audioTiempo);
  	this.audio.pause();
  	this.audio.currentTime=0;

  	for (let animal of this.animales) {
  		if (animal.nombre!=animalSel.nombre){
  			animal.reproduciendo=false;
  		}
  	}
  }

  refresh_animals (refresher: Refresher) {
  	setTimeout(()=>{
  		this.animales=ANIMALES.slice(0);
  		refresher.complete();
  		},1500)

  }

  borrar_animal (index:number) {
  	this.animales.splice(index,1);
  }

  reordenar_animales(indices:any) {
  	console.log(indices);
  	this.animales=reorderArray(this.animales,indices);
  }
  

}
