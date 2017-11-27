import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { IMessage } from './message.interface';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/map';

@Injectable()
export class TextWriterService {

  constructor(private http: HttpClient) { }

  public getMessages(): Observable<IMessage[]> {
    return this.http.get('https://bxjqeqgeud.execute-api.eu-west-1.amazonaws.com/Prod', {
      headers: new HttpHeaders().set('Content-Type', 'application/json')
    })
    .map((response: any) => {
      console.log('[GET] Response: ', response);
      return response;
    });
  }

  public postMessage(msg: IMessage): Observable<any> {
    const body: any = {
      message: msg.message,
      xPos: msg.xPos,
      yPos: msg.yPos
    };

    return this.http.post('https://bxjqeqgeud.execute-api.eu-west-1.amazonaws.com/Prod', body)
    .map((res: any) => {
      console.log('[POST] Response', res);
    });
  }
}
