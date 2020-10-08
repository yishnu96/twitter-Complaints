import { Component, OnInit , Input} from '@angular/core';
import { TweetService } from '../shared/services/twitter/tweet.service';

@Component({
  selector: 'app-register-complaint',
  templateUrl: './register-complaint.component.html',
  styleUrls: ['./register-complaint.component.css']
})
export class RegisterComplaintComponent implements OnInit {

  Complaints: any[] = [];
  constructor(private tweetService: TweetService) {
    // this.Complaints = this.tweetService.Complaints;

    // console.log(this.Complaints);
    this.displayComplaints();

  }

  ngOnInit(): void { }

  displayComplaints(){
    this.tweetService.fetchingComplaints().subscribe((res:any)=>{
      console.log(res);
      this.Complaints = res.data;
    },(err)=>{
      console.log(err);
    });
  }



  processing(index: number) {
    this.tweetService.inProcessing(this.Complaints[index].user).subscribe(res => console.log(res));
  }

  resolved(index: number) {
    this.tweetService.isResolved(this.Complaints[index].user).subscribe(res => console.log(res));
  }

}
