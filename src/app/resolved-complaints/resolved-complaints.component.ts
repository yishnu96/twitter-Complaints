import { Component, OnInit } from '@angular/core';
import { TweetService } from '../shared/services/twitter/tweet.service';

@Component({
  selector: 'app-resolved-complaints',
  templateUrl: './resolved-complaints.component.html',
  styleUrls: ['./resolved-complaints.component.css']
})
export class ResolvedComplaintsComponent implements OnInit {

  resolvedTweets: any[] = [];
  constructor(private tweetService: TweetService) {
    this.displayResolvedTweets();
  }

  ngOnInit(): void { }

  displayResolvedTweets() {
    this.tweetService.displayResolvedComplaints().subscribe((res: any) => {
      console.log(res);
      this.resolvedTweets = res.data;
    }, (err) => {
      console.log(err);
    });
  }

  reactiveComplaints(index: number){
    this.tweetService.reactive(this.resolvedTweets[index].user).subscribe(res => {
      console.log(res);
    });
  }

}


