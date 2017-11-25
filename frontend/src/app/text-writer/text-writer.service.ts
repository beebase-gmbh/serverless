import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { IMessage } from './message.interface';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';

const MOCK_DATA: IMessage[] = [
  { message: 'It\'s easy', posX: 23, posY: 12 },
  { message: 'Just click somewhere', posX: 40, posY: 30 },
  { message: '-->🤘😁<--', posX: 60, posY: 49 },
  { message: 'Enjoy', posX: 50, posY: 68 }
];

@Injectable()
export class TextWriterService {

  constructor(private http: HttpClient) { }

  public getMessages(): Observable<IMessage[]> {
    return Observable.of(MOCK_DATA);
  }

  public postMessage(msg: IMessage): Observable<any> {
    return this.http.post('url', msg);
  }
}
