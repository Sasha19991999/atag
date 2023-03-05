import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class InteractionService {

  private subject = new BehaviorSubject(0);
  public selectedInfo$ = this.subject.asObservable();

  constructor() { }
  
  setInfo(code: number) {
    this.subject.next(code);
  }
}
