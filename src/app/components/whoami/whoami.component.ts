import { Component, OnInit, AfterViewInit } from '@angular/core';
import { User } from 'src/app/services/user.model';
import { FormControl } from '@angular/forms';
import { DataService } from 'src/app/services/data.service';
import { Router, RouterOutlet } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { AnimationItem } from 'lottie-web';
import { AnimationOptions } from 'ngx-lottie';
import {  } from '@angular/common';
import { PwaService } from 'src/app/services/Pwa.service';
import { AngularFireAnalytics } from '@angular/fire/analytics';

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

  constructor(private dataService : DataService, private router: Router,public auth: AuthService, public Pwa: PwaService, private analytics: AngularFireAnalytics) {
    this.lottieConfig = {
      path: '/assets/hourglass2.json',
      renderer: 'canvas',
      autoplay: true,
      loop: true
    };
    this.username = dataService.name;
    this.userdateofbirth = dataService.dateofBirth;

    analytics.logEvent('App loaded')
   }
   
   options: AnimationOptions = {

    path: 'https://raw.githubusercontent.com/swapcy/Assets/master/Kaleidoscope.json'
    };
    handleAnimation(anim: any) {
      this.anim = anim;
    }
 
  animationCreated(animationItem: AnimationItem): void {
    // console.log(animationItem);
  }

  ngOnInit() {
     // console.log('oninit called')
     this.username = this.dataService.getValues()['name'];
     this.userdateofbirth = this.dataService.getValues()['dob'];

     if(this.dataService.userObj){
       this.username = this.dataService.getValues()['name'];
       this.userdateofbirth = this.dataService.getValues()['dob'];
     }
     
     this.analytics.logEvent('Home')

     this.options = {
      path: this.randomNumber(1,4)
      };
 
  }





  onClickContinue(myformvalues){
    this.dataService.setValue(this.username, this.userdateofbirth);
    this.analytics.logEvent('Calculate',  {"dob": this.userdateofbirth})
    myformvalues.reset();
  }

  async getUserDetails(){
   this.analytics.logEvent('Continue to Time',  {"dob": this.userdateofbirth})
   this.router.navigate(['time'])
  }

  installPwa(): void {
    this.Pwa.promptEvent.prompt();
  }

  randomNumber(min, max): string {
    const no = Math.round(Math.random() * (max - min) + min);
    if(no == 1){
      return 'https://raw.githubusercontent.com/swapcy/Assets/master/hourglass2.json';
    }
    else if(no == 2){
      return 'https://raw.githubusercontent.com/swapcy/Assets/master/sun-moon-rise.json';
    }
    else if(no ==3){
      return 'https://raw.githubusercontent.com/swapcy/Assets/master/Kaleidoscope.json';
    }
    // else{
    //   return 'https://raw.githubusercontent.com/swapcy/Assets/master/hourglass2.json';
    // }
  }

}
