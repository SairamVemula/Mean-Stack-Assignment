import { DashService } from './../../dash.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-dash-content',
  templateUrl: './dash-content.component.html',
  styleUrls: ['./dash-content.component.css'],
})
export class DashContentComponent implements OnInit {
  lists;
  constructor(private dashService: DashService) {}
  ngOnInit(): void {
    // const user = JSON.parse(atob(localStorage.getItem('token').split('.')[1]));
    // console.log(user);
    this.dashService.getList().subscribe((res) => {
      console.log(res);
      this.lists = res.data;
    });
  }
}
