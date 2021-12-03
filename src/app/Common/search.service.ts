import { Injectable } from '@angular/core';
import { Subject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SearchService {
  private subject = new Subject<any>();
  constructor() { }

  sendTriggeredEvent($data : any) {
    this.subject.next($data);
  }

  getTriggeredEvent(): Observable<any> {
    return this.subject.asObservable();
  }

}
