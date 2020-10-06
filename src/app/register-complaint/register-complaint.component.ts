import { Component, OnInit } from '@angular/core';
import { TweetService } from '../shared/services/twitter/tweet.service'

@Component({
  selector: 'app-register-complaint',
  templateUrl: './register-complaint.component.html',
  styleUrls: ['./register-complaint.component.css']
})
export class RegisterComplaintComponent implements OnInit {

  Complaints: any[] = [];
  constructor(private tweetService: TweetService) { }

  ngOnInit(): void {
  }

  processing(index: number){
    this.tweetService.inProcessing(this.Complaints[index].user.id).subscribe();
  }

  resolved(index: number){
    this.tweetService.isResolved(this.Complaints[index].user.id).subscribe();
  }

}
