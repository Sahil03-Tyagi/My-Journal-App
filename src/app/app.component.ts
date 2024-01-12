import { Component, OnInit } from '@angular/core';
import { Calendar, CalendarOptions, EventInput } from '@fullcalendar/core';
import interactionPlugin from '@fullcalendar/interaction';
import dayGridPlugin from '@fullcalendar/daygrid';
import momentplugin from '@fullcalendar/moment';
import { CalendarEvent, CalendarState } from './app.state';
import { Store, select } from '@ngrx/store';
import * as CalendarActions from './app.actions';
import { CalendarService } from './calendar.service';
import { DatePipe } from '@angular/common';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit {
  addModal = false;
  modModal = false;
  eventSources: EventInput[] = [];
  showModal: boolean = false;
  showModModal= false;
  modalTitle: string = '';
  eventFormModel: Partial<CalendarEvent> = {};
  calen: Calendar | undefined;

  calendarOptions : CalendarOptions | undefined;
  title: any;

  constructor(private store:Store<{calendar: CalendarState}>, private service: CalendarService, private datePipe: DatePipe){}

  ngOnInit(): void {

      this.store.dispatch(CalendarActions.fetchEvent());
      this.store.pipe(select('calendar')).subscribe((event) => {
        const ngEvent = event.events;
        this.service.getEvent().subscribe((api) => {
          this.eventSources = [...ngEvent,...api] as EventInput[];
          setTimeout(() =>{
          this.setCalender();
        },1000);
        })
      });

    this.calendarOptions = {
      plugins: [dayGridPlugin,interactionPlugin, momentplugin],
      initialView: 'dayGridMonth',
      dateClick: this.onDateClick.bind(this),

    }; 
  }

  setCalender(){
    this.calendarOptions = {
      plugins: [dayGridPlugin,interactionPlugin, momentplugin],
      initialView: 'dayGridMonth',
      dateClick: this.onDateClick.bind(this),
      eventClick: this.onEventClick.bind(this),
      events: this.eventSources
    }; 
    console.log("Event from api ",this.eventSources);
  }

  onEventClick(eve: any){
    this.modModal = true;
    this.modalTitle = 'Modify Event';
    eve.jsEvent.preventDefault();
    this.eventFormModel = {
      id: eve.event._def.publicId,
      title: eve.event._def.title,
      url: eve.event._def.url,
      start: new Date(eve.event._instance.range.start).toISOString().slice(0, 16),
      end: new Date(eve.event._instance.range.end).toISOString().slice(0, 16)
  };
  if(this.eventFormModel.url) {
    window.open(this.eventFormModel.url);
  }
    this.showModal = true;
    console.log(this.eventFormModel)
  }
  
  onDateClick(info: any) {

    const nowDate = this.getDateWithoutTime(new Date());
    const clickedDate = this.getDateWithoutTime(new Date(info.dateStr));
    
    const selectedDate = new Date(info.dateStr).toISOString().slice(0, 16);

    if(clickedDate>=nowDate){
    this.modalTitle = 'Add Event';
    this.eventFormModel = {
        title: '',
        url:'',
        start: selectedDate,
        end: selectedDate
    };
    console.log(this.eventFormModel.start);
    this.showModal = true;
  }else{
    alert("Can not add event");
  }
  }

  getDateWithoutTime(dt: any)
{
  dt.setHours(0,0,0,0);
  return dt;
}

  // Add and Modify Event Method
  submitEvent() {
    console.log("hiiii");
    const { title, url, start, end } = this.eventFormModel;
    const nowDate = this.getDateWithoutTime(new Date());
    const clickedDate = this.getDateWithoutTime(new Date(start as string));

    if(clickedDate>=nowDate){
      if(this.getDateWithoutTime(new Date(end as string))>=clickedDate){

    // Modify Event
    if (this.eventFormModel.id !== undefined) {
        const id = this.eventFormModel.id;
        if(id !== undefined){
            const updatedEvent: CalendarEvent = {
            id,
            title: title,
            url: url,
            start: start,
            end: end
        };
          console.log(updatedEvent.id,updatedEvent.title)
          
          this.service.updateEvent(id,updatedEvent).subscribe((eve) => {
            this.store.dispatch(CalendarActions.modifyEvent({ eventId: id, updatedEvent }));
          });
          console.log("modify");
          this.resetForm();
      }}
      else {
        //add a new event
       
        const newEvent: CalendarEvent = {
          id: new Date().getTime(),
          title: title,
          url: url,
          start: start,
          end: end
        };
          this.store.dispatch(CalendarActions.addEvent({ event: newEvent }));
          this.service.addEvent(newEvent).subscribe((eve: CalendarEvent) => { console.log("Event Added: ", eve)});
          console.log("added");
          this.resetForm();
      }
      }
      else{
        alert("end date should not be less than selected date");
        
      }}else{
        alert("Can not add event for past date");
      }
    }

    // Delete Event method
    deleteEvent(){

      if (this.eventFormModel.id !== undefined) {
        const id = this.eventFormModel.id; 
        this.service.deleteEvent(id).subscribe((eve: CalendarEvent) =>{
          this.store.dispatch(CalendarActions.deleteEvent({eventId: id})); 
        });
        console.log("Delete");
      }
      this.resetForm();
      
    }

    resetForm() {
      this.showModal = false;
      this.modalTitle = '';
      this.eventFormModel = {};
    }
}





