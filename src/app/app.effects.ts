import { Injectable } from "@angular/core";
import { CalendarService } from "./calendar.service";
import {Actions, createEffect, ofType} from "@ngrx/effects";
import * as EventActionType from "./app.actions"
import { catchError, map, mergeMap, of } from "rxjs";


@Injectable()
export class EventEffects{

    constructor(private actions$: Actions, private eventService: CalendarService){}

    fetchEvent$ = createEffect(() => this.actions$.pipe(
        ofType(EventActionType.fetchEvent),
        mergeMap(() =>
        this.eventService.getEvent().pipe(
            map((event) => EventActionType.fetchEventSuccess({event}))))
    ));

}
