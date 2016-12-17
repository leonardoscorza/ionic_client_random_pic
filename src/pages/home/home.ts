import { Component } from '@angular/core';
import {Camera} from 'ionic-native';

// Carregando nosso service que vai se comunicar com a API
import {HomeService} from '../../providers/home-service';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html',
  providers: [HomeService]
})
export class HomePage {
  // Cricando nossa variavel que vai armazenar as fotos
  public photos: any;

  constructor(public homeService: HomeService) {
    // Chama a listagem de fotos quando a página é carregada
    this.loadHome();
  }

  // Chama o service para montar a listagem de fotos
  loadHome(){
    console.log('hey');
    this.homeService.load()
    .then(data => {
      console.log(data);
      this.photos = data;
    });
  }

  // Chama o service para adicionar uma nova foto
  addPhotoHome(photo){
    console.log('hey 2');
    this.homeService.addPhoto(photo)
    .then(data => {
      this.loadHome();
    });
  }

  doRefresh(refresher){
    setTimeout(() => {
      this.loadHome();
      refresher.complete();
    }, 2000);
  }

  // Abre o serviço de fotos e depois chama o service para passar a foto que tiramos para a API
  takePicture(){
   Camera.getPicture({
       destinationType: Camera.DestinationType.DATA_URL,
       targetWidth: 1000,
       targetHeight: 1000
   }).then((imageData) => {
       this.addPhotoHome("data:image/jpeg;base64," + imageData);
   }, (err) => {
       console.log(err);
   });
  }

}
