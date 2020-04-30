import { Router } from '@angular/router';
import { DashService } from './../../dash.service';
import { Component, OnInit, Input, Inject } from '@angular/core';

@Component({
  selector: 'app-dash-item',
  templateUrl: './dash-item.component.html',
  styleUrls: ['./dash-item.component.css'],
})
export class DashItemComponent implements OnInit {
  @Input() list;
  constructor(private router: Router) {}

  onView() {
    this.router.navigate(['/Dashboard/View'], this.list);
  }
  onShare() {
    this.router.navigate(['/Share'], this.list);
  }
  ngOnInit(): void {}
}
