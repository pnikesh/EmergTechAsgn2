
import { Message } from './../models/message';

import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders} from '@angular/common/http';
import { Observable } from 'rxjs';

import { User } from '../models/user';


@Injectable({
  providedIn: 'root'
})
export class MessageService {
  private user: User;
  private authToken: any = null;

  private endpoint = 'https://comp308-w2019-lesson10b.herokuapp.com/api/message/';

  //private endpoint = 'http://localhost:3000/api/message/';

  private httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Headers': 'Origin, X-Requested-With, Content-Type, Accept'
    })
  };

  constructor(private http: HttpClient) {
    this.user = new User();
  }

  public getList(): Observable<any> {
    this.loadToken();
    return this.http.get<any>(this.endpoint, this.httpOptions);
  }


  public addMessage(message: Message): Observable<any> {
    this.loadToken();
    return this.http.post<any>(this.endpoint + 'add', message, this.httpOptions);
  }


  public deleteMessage(message: Message): Observable<any> {
    this.loadToken();
    return this.http.get<any>(this.endpoint + 'delete/' + message._id, this.httpOptions);
  }

  private loadToken() {
    const token = localStorage.getItem('id_token');
    this.authToken = token;
    this.httpOptions.headers = this.httpOptions.headers.set('Authorization', this.authToken);
  }
}
