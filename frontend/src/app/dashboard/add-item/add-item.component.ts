import { FormControl, Validators, FormGroup } from '@angular/forms';
import { UserService } from './../../user/user.service';
import { Router } from '@angular/router';
import { DashService } from './../../dash.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-add-item',
  templateUrl: './add-item.component.html',
  styleUrls: ['./add-item.component.css'],
})
export class AddItemComponent implements OnInit {
  form;
  readOnly = false;
  button: string = 'Add';
  list = {
    skills: [''],
    education: [''],
    name: '',
    email: '',
    website: '',
    contact_no: '',
    profile_heading: '',
    profile_description: '',
  };
  // value;
  textAreaAdjust(o) {
    o.style.height = '1px';
    o.style.height = 25 + o.scrollHeight + 'px';
  }

  onButton() {
    // console.log(this.list);
    this.dashService.addResume(this.list).subscribe((res) => {
      // console.log(res);
      if (res.success) {
        this.router.navigate(['/Dashboard']);
      }
    });
  }

  constructor(
    private router: Router,
    private userService: UserService,
    private dashService: DashService
  ) {}

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
    return this.userService.loggedIn();
  }

  ngOnInit(): void {
    this.form = new FormGroup({
      profile_heading: new FormControl(
        '',
        Validators.compose([
          Validators.required,
          Validators.minLength(30),
          Validators.maxLength(255),
        ])
      ),
      profile_description: new FormControl(
        '',
        Validators.compose([Validators.required, Validators.minLength(200)])
      ),
      name: new FormControl(
        '',
        Validators.compose([
          Validators.required,
          Validators.pattern('[\\w\\-\\s\\/]+'),
        ])
      ),
      email: new FormControl(
        '',
        Validators.compose([Validators.required, Validators.email])
      ),
      contact_no: new FormControl(
        '',
        Validators.compose([
          Validators.required,
          Validators.maxLength(10),
          Validators.minLength(10),
        ])
      ),
      website: new FormControl(
        '',
        Validators.compose([
          Validators.required,
          Validators.pattern(
            '^(http://www.|https://www.|http://|https://)?[a-z0-9]+([-.]{1}[a-z0-9]+)*.[a-z]{2,5}(:[0-9]{1,5})?(/.*)?$'
          ),
        ])
      ),
    });
  }
}
