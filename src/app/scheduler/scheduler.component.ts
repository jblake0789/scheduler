import {Component, ElementRef, OnInit, ViewChild, ViewEncapsulation } from "@angular/core";
import "dhtmlx-scheduler";
import {} from "@types/dhtmlxscheduler"
import { EventService } from "../_services/event.service";
import {Event} from "../_models/event.model";

import "../../../node_modules/dhtmlx-scheduler-pro/codebase/dhtmlxscheduler.js?v=20180517";
import '../../../node_modules/dhtmlx-scheduler-pro/codebase/ext/dhtmlxscheduler_timeline.js?v=20180517';

@Component({
  selector: 'app-scheduler',
  templateUrl: './scheduler.component.html',
  styleUrls: ['./scheduler.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class SchedulerComponent implements OnInit {
  @ViewChild("schedulerHere") schedulerContainer: ElementRef;

  constructor(private eventService: EventService) { }

  ngOnInit(){
    scheduler.init(this.schedulerContainer.nativeElement, new Date());
    
    scheduler.config.xml_date = "%Y-%m-%d %H:%i";
      this.eventService.get()
      .then((data) => {
         scheduler.parse([
          {text:"Conference", start_date:"07-14-2018 00:00", end_date:"07-15-2018 00:00", 
          room_id:"1"},
          {text:"Meeting",    start_date:"13/07/2018 09:00", end_date:"17/07/2018 21:00", 
          room_id:"2"},
          {text:"Conference", start_date:"17/09/2012 15:00", end_date:"18/09/2012 15:00", 
          room_id:"3"}
      ],"json");
         console.log(data);
    });
    scheduler.createTimelineView({
        name:"timeline",
        x_unit:"hour",//measuring unit of the X-Axis.
        x_date:"%H:%i", //date format of the X-Axis
        x_step:1,      //X-Axis step in 'x_unit's
        x_size:24,      //X-Axis length specified as the total number of 'x_step's
        x_start:16,     //X-Axis offset in 'x_unit's
        x_length:6,    //number of 'x_step's that will be scrolled at a time
        fit_events: "false",
        y_unit:     
        [{key:1, label:"Room 1"},
         {key:2, label:"Room 2"},
         {key:3, label:"Room 3"},
         {key:4, label:"Room 5"},
         {key:5, label:"Room 4"},
         {key:5, label:"Room 6"}],
        y_property:"room_id", 
        dy: "5",
        section_autoheight: "false",
        event_dy: "full",
        render:"bar"             //view mode
    }); 
  }

  //serializing events method
  private serializeEvent(data: any, insert: boolean = false): Event {
    const result = {};

    for(let i in data){
        if(i.charAt(0) == "$" || i.charAt(0) == "_") continue;
        if(insert && i == "id") continue;
        if(data[i] instanceof Date){
            result[i] = scheduler.templates.xml_format(data[i]);
        } else {
            result[i] = data[i];
        }
    }
    return result as Event;
  }

}
