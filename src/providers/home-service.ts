import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';

@Injectable()
export class HomeService {
  public data: any;
  public api_url: string;

  constructor(public http: Http) {
    this.api_url = 'https://cryptic-anchorage-92733.herokuapp.com';
  }


  // Carrega a listagem de Fotos
  load() {
    return new Promise(resolve => {
      this.http.get(this.api_url + '/pics')
        .map(res => res.json())
        .subscribe(data => {
          this.data = data;
          resolve(this.data);
        });
    });
  }

  // Adiciona novas fotos
  addPhoto(photo) {
    return new Promise(resolve => {
      this.http.post(this.api_url + '/pics', {'pic': {'photo': photo}})
        .map(res => res.json())
        .subscribe(data => {
          this.data = data.results;
          resolve(this.data);
        });
    });
  }

}
