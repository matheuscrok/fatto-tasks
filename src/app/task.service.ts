import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
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

  public adicionar(task: any): Observable<any> {
    let headers = new HttpHeaders();
    headers.append('Content-Type', 'application/json');
    console.log(task)
    return this.httpClient.post<any>(this.apiUrl, task, {headers : headers});
  }

  public excluir(task: string): void {
    this.httpClient.delete(this.apiUrl + '/' + task).subscribe();
  }

  public update(task:any,taskId: string): Observable<any> {
    let headers = new HttpHeaders();
    headers.append('Content-Type', 'application/json');
    return this.httpClient.put<any>(this.apiUrl + '/' + taskId, task, {headers : headers})
     
  }
}
