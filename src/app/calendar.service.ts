import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CalendarEvent } from './app.state';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class CalendarService {

  private baseurl  = 'http://localhost:8080/events';

  constructor(private http:HttpClient ) {}

  getEvent(): Observable<CalendarEvent[]>{
    return this.http.get<CalendarEvent[]>(this.baseurl);
  }

  addEvent(event: CalendarEvent): Observable<CalendarEvent>{
    return this.http.post<CalendarEvent>(this.baseurl,event);
  }

  updateEvent(id: number,event: CalendarEvent): Observable<CalendarEvent>{
    console.log('put service',id,event);
    return this.http.put<CalendarEvent>(this.baseurl+"/"+id,event);
  }

  deleteEvent(id: number): Observable<any>{
    console.log('delete service');
    return this.http.delete(this.baseurl +"/"+ id);
  }
}
