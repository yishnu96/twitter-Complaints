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
    // return this.http.get(this.url + '/tweets/all_complaints');
  }



  fetchingComplaints(){
    return this.http.get(this.url + '/tweets/fetch_complaints');
  }

  displayResolvedComplaints(){
    return this.http.get(this.url + '/tweets/resolved_complaints');
  }

  reactive(user: any) {
    return this.http.put(this.url + '/tweets/reactive', {user}, {});
  }

  // isComplaint(user: any, text: any) {
  //    return this.http.post(this.url + '/tweets/complaint',  user,{} )
  // }

  isComplaint(user: any, text: any) {
    return this.http.post(this.url + '/tweets/complaint', { user, text }, {})
  }

  inProcessing(user: any) {
    return this.http.put(this.url + '/tweets/process_complaint', { user }, {});
  }

  isResolved(user: any) {
    return this.http.put(this.url + '/tweets/resolve_complaint', { user });
  }


  // datareciving(data: any) {
  //   console.log(("data from home component" , data));
  //   this.Complaints.push(data);
  // }

  getDataFromService() {
    console.log(this.Complaints);
  }
}


