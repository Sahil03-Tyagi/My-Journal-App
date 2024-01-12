import { createReducer, on } from '@ngrx/store';
import * as CalendarActions from './app.actions';
import { CalendarEvent } from './app.state';
 
export interface CalendarState {
  events: CalendarEvent[];
}
 
const initialState: CalendarState = {
  events: []
};
 
export const calendarReducer = createReducer(
  initialState,
 
  on(CalendarActions.addEvent, (state, { event }) => ({
    ...state,
    events: [...state.events,event],
  })),
 
  on(CalendarActions.modifyEvent, (state, { eventId, updatedEvent }) => ({
    ...state,
    events: state.events.map((data ) => { return data.id == eventId ? updatedEvent : data})

  })),

  on(CalendarActions.deleteEvent,(state, {eventId}) => ({
    ...state,
    events: state.events.filter(data => data.id!=eventId)
  })),

  on(CalendarActions.fetchEventSuccess,(state,{event}) => ({
    ...state,
    events: event
  })),

);
 

