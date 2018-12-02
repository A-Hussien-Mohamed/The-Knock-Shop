import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

interface MyData {
  items: [{
    id: Int16Array,
    name: string,
    photoUrl: string,
    description: string,
    price: Float32Array
  }]
}



@Injectable()
export class ConfigService {

  constructor(private _httpClient: HttpClient) { }

  getMenuItem() {
    return this._httpClient.get<MyData>('https://api.myjson.com/bins/z9s2i');
  }
}