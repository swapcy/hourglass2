import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/services/user.model';
import { FormControl } from '@angular/forms';
import { DataService } from 'src/app/services/data.service';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
@Component({
  selector: 'app-whoami',
  templateUrl: './whoami.component.html',
  styleUrls: ['./whoami.component.scss']
})

export class WhoamiComponent implements OnInit {
  username = "";
  userdateofbirth = "";
  myform = new FormControl();
  path = "";
  loggedIn = false;
  userInfo : User;
  list: any;
  constructor(private dataService : DataService, private router: Router,public auth: AuthService) {
    this.username = dataService.name;
    this.userdateofbirth = dataService.dateofBirth;
   }

  ngOnInit() {
     // console.log('oninit called')
     this.username = this.dataService.getValues()['name'];
     this.userdateofbirth = this.dataService.getValues()['dob'];
     if(this.dataService.userObj){
       this.username = this.dataService.getValues()['name'];
       this.userdateofbirth = this.dataService.getValues()['dob'];
     }
     // console.log(`${this.username},${this.userdateofbirth}`)
 
  }

  onClickContinue(myformvalues){
    this.dataService.setValue(this.username, this.userdateofbirth);
    myformvalues.reset();
  }

}
