import { TweetService } from './../shared/services/twitter/tweet.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-chat-box',
  templateUrl: './chat-box.component.html',
  styleUrls: ['./chat-box.component.css']
})
export class ChatBoxComponent implements OnInit {


  tweets: any[] = [];
  constructor(private tweetService: TweetService) {
    this.displayTweets();
  }


  ngOnInit(): void {
  }

  displayTweets(){
    this.tweetService.displayAllComplaints().subscribe((res:any)=>{
      console.log(res);
      this.tweets = res.data;
    },(err)=>{
      console.log(err);
    });
  }

  cdd() {
    console.log(this.tweets);

  }

}
