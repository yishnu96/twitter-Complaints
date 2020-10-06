import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class TweetService {

  url = 'http://localhost:4040/api';

  constructor(private http: HttpClient) { }

  displaytweeets(){
    return this.http.get(this.url + '/tweets/showtweets');
  }

  isComplaint(user:any, text:any){
    console.log(user, text);
    return this.http.post(this.url + '/tweets/complaint/', {user: user , text: text} );
  }

  inProcessing( id :){
    return this.http.put('${this.url}/tweets/process_complaint',{id});
  }

  isResolved(){
    return this.http.put('${this.url}/tweets/resolve_complaint',{});
  }
}


