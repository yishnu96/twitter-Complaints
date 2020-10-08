import { Component, OnInit } from '@angular/core';
import { any } from 'joi';
import { TweetService } from '../shared/services/twitter/tweet.service'

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  Tweets: any[] = [];
  constructor(private tweetService: TweetService) {
    this.displayTweets();
   }

  ngOnInit() {

  }

  displayTweets(){
    this.tweetService.displaytweeets().subscribe((res:any)=>{
      console.log(res);
      this.Tweets = res.data;
    },(err)=>{
      console.log(err);
    })
  }

    register(index: number) {
      // this.Complint =
      // this.tweetService.isComplaint(this.Tweets[index].user.name, this.Tweets[index].text);
      console.log(this.Tweets[index].user);

      this.tweetService.isComplaint(this.Tweets[index].user, this.Tweets[index].text).subscribe((res: any) => {
        console.log(res);
        this.tweetService.Complaints.push(res.data);
      });
      // this.tweetService.datareciving(this.Complint);
    }


  }
