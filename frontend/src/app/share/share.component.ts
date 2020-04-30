import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-share',
  templateUrl: './share.component.html',
  styleUrls: ['./share.component.css'],
})
export class ShareComponent implements OnInit {
  constructor(private router: Router) {}
  navigationExtra = <List>this.router.getCurrentNavigation().extras;

  url = 'http://localhost:4200/View/' + this.navigationExtra._id;

  onClick() {
    this.router.navigate(['/View', this.navigationExtra._id]);
  }

  ngOnInit(): void {
    // console.log(this.navigationExtra._id);
  }
}
interface List {
  _id: string;
  skills: [string];
  education: [string];
  user_id: string;
  name: string;
  email: string;
  website: string;
  contact_no: number;
  profile_heading: string;
  profile_description: string;
}
