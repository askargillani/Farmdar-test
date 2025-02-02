import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class MapService {

  public headers: HttpHeaders = new HttpHeaders();
    public httpOptions: any;
    constructor(
        protected http: HttpClient
      ) {
    }
  
    public get reqheaders() {
      this.headers = new HttpHeaders(
        {
          'Content-Type': 'application/json',
        },
      );
  
      this.httpOptions = {
        headers: this.headers
      };
      return this.httpOptions;
    }

    getLatLongs(location: string, format: string, limit: number) {
      let req = `https://nominatim.openstreetmap.org/search?q=${location}&format=${format}&limit=${limit}`;
      return this.http.get(req, this.reqheaders);
    }

    getOpenStreetMap(amenity: string, radius: string, latitude: string, longitude: string) {
      let req = "https://overpass-api.de/api/interpreter?data=[out:json];node['amenity'='"
          + amenity + "'](around:" + radius + "," + latitude + "," + longitude 
          + ");out body;>;out skel qt;";
      return this.http.get(req, this.reqheaders);
    }
  
}
