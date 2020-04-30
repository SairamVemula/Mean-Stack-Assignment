import { DashService, Items } from './../dash.service';
import { UserService } from './../user/user.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import * as $ from 'jquery';
import * as _ from 'lodash';

@Component({
  selector: 'app-view',
  templateUrl: './view.component.html',
  styleUrls: ['./view.component.css'],
})
export class ViewComponent implements OnInit {
  shareView = false;
  readOnly = true;
  button: string = 'Edit';
  // value;

  constructor(
    private router: Router,
    private userService: UserService,
    private dashService: DashService,
    private route: ActivatedRoute
  ) {}

  textAreaAdjust(o) {
    o.style.height = '1px';
    o.style.height = 25 + o.scrollHeight + 'px';
  }

  onButton() {
    if (this.button === 'Edit') {
      this.button = 'Save';
      this.readOnly = false;
    } else if (this.button === 'Save') {
      this.button = 'Edit';
      this.readOnly = true;
      // console.log(this.list);
      this.dashService
        .updateResume(
          _.pick(this.list, [
            '_id',
            'user_id',
            'name',
            'email',
            'website',
            'contact_no',
            'profile_heading',
            'profile_description',
            'skills',
            'education',
          ])
        )
        .subscribe(
          (res) => {
            console.log(res);
          },
          (error) => {
            console.log(error);
          }
        );
    }
  }

  onClickPlusOfEdu() {
    this.list.education.push('');
  }

  onClickCrossOfEdu(s) {
    this.list.education.splice(s, 1);
  }
  inputEnterEdu(s, val) {
    // console.log();
    this.list.education[s] = val;
  }
  onClickPlusOfSkill() {
    this.list.skills.push('');
  }

  onClickCrossOfSkill(e) {
    this.list.skills.splice(e, 1);
  }
  inputEnterSkill(s, val) {
    // console.log(`${val}   ${s}`);
    this.list.skills[s] = val;
  }
  // onClickOkOfEdu(education){
  //   console.log(education);
  // }

  editVisiblity() {
    // return this.userService.loggedIn();
    if (this.userService.loggedIn && this.shareView == false) {
      return true;
    }
    return false;
  }

  // list = <Items>this.router.getCurrentNavigation().extras;

  list = <Items>this.router.getCurrentNavigation().extras;

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.dashService.getSingle(id).subscribe((res) => {
        // console.log(res.data);
        this.shareView = true;
        this.list = <Items>res.data;
      });
    }
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
