import { Injectable } from '@angular/core';
import { HttpClient } from 'selenium-webdriver/http';

@Injectable({
  providedIn: 'root'
})
export class MapsService {

  constructor(private http: HttpClient) { }

  getLocation(){
    //this.http.send
  //  return  this.http.send("http://api.ipapi.com/api/check?AIzaSyBfNetSi37wanElF5w5Brhujb4g4mO5P00")
  }
}
