import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})

export class TweetService {

  url = 'http://localhost:4040/api';

  Complaints: any[] = [];

  constructor(private http: HttpClient) { }

  displaytweeets() {
    return this.http.get(this.url + '/tweets/showtweets');
  }

  // isComplaint(user: any, text: any) {
  //    return this.http.post(this.url + '/tweets/complaint',  user,{} )
  // }

  isComplaint(user: any, text: any) {
    // console.log(user)
    return this.http.post(this.url + '/tweets/complaint', { user, text }, {})
  }

  inProcessing(id: any) {
    return this.http.put(this.url + '/tweets/process_complaint', { id: id });
  }

  isResolved(id: any) {
    return this.http.put(this.url + '/tweets/resolve_complaint', { id: id });
  }

  datareciving(data: any) {
    console.log(("data from home component " + data));
    this.Complaints.push(data);
  }
}


