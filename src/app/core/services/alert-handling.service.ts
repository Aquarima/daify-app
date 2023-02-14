import {Injectable} from '@angular/core';
import {Observable, ReplaySubject} from "rxjs";
import {SystemAlert} from "../models";
import {AlertType} from "../models/system-alert";

@Injectable({
  providedIn: 'root'
})
export class AlertHandlingService {

  private subject: ReplaySubject<SystemAlert> = new ReplaySubject(3);

  constructor() { }

  throwAlert(type: AlertType, title: string, message: string) {
    this.subject.next({type: type, title, message: message});
  }

  get alert(): Observable<SystemAlert> {
    return this.subject.asObservable();
  }
}
