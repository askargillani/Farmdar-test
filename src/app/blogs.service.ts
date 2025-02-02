import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BlogsService {
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

  getBlogs(): Observable<any> {
    let req = 'https://dummyjson.com/posts';
    return this.http.get(req, this.reqheaders);
  }

}
