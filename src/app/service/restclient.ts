import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

export interface Surveys {
  id: number;
  survey: string;
}

@Injectable({
  providedIn: 'root'
})
export class Restclient {

  private readonly apiUrl = 'http://localhost:8080/api';

  constructor(private http: HttpClient) { }

  get(url: String): Observable<any> {
    return this.http.get(`${this.apiUrl}${url}`);
  }

  post(data: any, url: String): Observable<any> {
    return this.http.post(`${this.apiUrl}${url}`, data);
  }

  delete(url: String): Observable<any> {
    return this.http.delete(`${this.apiUrl}${url}`);
  }
}
