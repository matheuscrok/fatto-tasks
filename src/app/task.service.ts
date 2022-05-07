import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TaskService {

  apiUrl = 'http://localhost:8080/task';


  constructor(private httpClient: HttpClient ) { }


  public listar(): Observable<any> {
    return this.httpClient.get(this.apiUrl);
  }
}
