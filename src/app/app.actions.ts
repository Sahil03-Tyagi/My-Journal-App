import { createAction,props } from "@ngrx/store";
import { CalendarEvent } from "./app.state";

export const addEvent = createAction(
    '[Calendar] Add Event',
    props<{event: CalendarEvent}>()
);

export const modifyEvent = createAction(
    '[Calendar] Modify Event',
    props<{eventId: number, updatedEvent: CalendarEvent}>()
);

// export const modifyEventSuccess = createAction(
//     '[Calendar] Modify Event Success',
//     props<{eventId: number, updatedEvent: CalendarEvent}>()
// );

export const deleteEvent = createAction(
    '[Calendar] Delete Event',
    props<{eventId: number}>()
);

export const fetchEvent = createAction(
    '[Calendar] Fetch Event'
);

export const fetchEventSuccess = createAction(
    '[Calendar] Fetch Event Success',
    props<{event: CalendarEvent[]}>()
);

export const deleteEventSuccess = createAction(
    '[Calendar] Delete Event Success',
    props<{eventId: number}>()
);

export const deleteEventFailure = createAction(
    '[Calendar] Delete Event Failure',
    props<{error: any}>()
);