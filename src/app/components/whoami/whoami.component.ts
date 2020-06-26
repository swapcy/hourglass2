import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/services/user.model';
import { FormControl } from '@angular/forms';
import { DataService } from 'src/app/services/data.service';
import { Router, RouterOutlet } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { AnimationItem } from 'lottie-web';
import { AnimationOptions } from 'ngx-lottie';
import {  } from '@angular/common';

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
  public lottieConfig: Object;
  private anim: any;
  private animationSpeed: number = 1;

  constructor(private dataService : DataService, private router: Router,public auth: AuthService) {
    this.lottieConfig = {
      path: '/assets/hourglass2.json',
      renderer: 'canvas',
      autoplay: true,
      loop: true
    };
    this.username = dataService.name;
    this.userdateofbirth = dataService.dateofBirth;
   }

   options: AnimationOptions = {
      path: 'https://raw.githubusercontent.com/swapcy/hourglass/master/sun-moon-rise.json'
    };

    handleAnimation(anim: any) {
      this.anim = anim;
    }
 
  animationCreated(animationItem: AnimationItem): void {
    console.log(animationItem);
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

  async getUserDetails(){
   this.router.navigate(['time']);
  }

}
