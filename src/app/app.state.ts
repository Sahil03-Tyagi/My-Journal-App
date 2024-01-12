export interface CalendarEvent {
    id: number | undefined;
    title: string | undefined;
    url: string | undefined;
    start: string | undefined;
    end: string | undefined;
  }
   
  export interface CalendarState {
    events: CalendarEvent[];

  }
   
  export const initialCalendarState: CalendarState = {
    events: [{
        id: 0,
        title: "",
        url: '',
        start: '',
        end: ''
    }]
  };