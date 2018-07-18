import {Injectable} from "@angular/core";
import {Event} from "../_models/event.model";
import {HttpClient} from "@angular/common/http";
import {ExtractData, HandleError} from "./service-helper";
// import 'rxjs/add/operator/toPromise';

@Injectable({
  providedIn: 'root'
})
export class EventService {
  private eventUrl = "api/events";

  constructor(private http: HttpClient) { }

  get(): Promise<Event[]>{
    return Promise.resolve([
        {id: "1", start_date: "08-02-2018 00:00", end_date: "08-31-2018 13:00", text: "Event 1"},
        {id: "2", start_date: "07-14-2018 00:00", end_date: "07-14-2018 13:00", text: "Event 2"},
    ]);
  }
  // get(): Promise<Event[]>{
  //   return this.http.get(this.eventUrl)
  //       .toPromise()
  //       .then(ExtractData)
  //       .catch(HandleError);
  // }

  insert(event: Event): Promise<Event> {
    return this.http.post(this.eventUrl, JSON.stringify(event))
        .toPromise()
        .then(ExtractData)
        .catch(HandleError);
  }

  update(event: Event): Promise<void> {
    return this.http.put('${this.eventUrl}/${event.id}', JSON.stringify(event))
        .toPromise()
        .then(ExtractData)
        .catch(HandleError);
  
  }
  
  remove(id: number): Promise<void> {
    return this.http.delete('${this.eventUrl}/${id}')
        .toPromise()
        .then(ExtractData)
        .catch(HandleError);
  }
}