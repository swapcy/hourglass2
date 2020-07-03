import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from 'src/app/services/user.model';
import { DataService } from 'src/app/services/data.service';
import { TimeService } from 'src/app/services/time.service';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { fader,slider } from 'src/app/services/route-animation'
import { AngularFireAnalytics } from '@angular/fire/analytics';

@Component({
  selector: 'app-whatistime',
  animations: [
    fader
  ],
  templateUrl: './whatistime.component.html',
  styleUrls: ['./whatistime.component.scss']
})
export class WhatistimeComponent implements OnInit {

  nameList = [];
  name = "";
  dateofBirth = "";
  dDays = '0';
  dHours = '0';
  dMins = '0';
  dSecs = '0';
  dhms : any;
  nameTime : Observable<any>;
  user : User[];


  constructor(private dataService : DataService, 
    private time : TimeService, 
    private router : Router, 
    public auth : AuthService,
    private analytics : AngularFireAnalytics
    ) { 
      
    }

  ngOnInit() {
     // console.log('oninit');
     this.name = this.dataService.getValues()['name'];
     this.dateofBirth = this.dataService.getValues()['dob'];
 
     if(this.name && this.dateofBirth){
       this.calc(this.dateofBirth);
       this.analytics.logEvent("Time", {'name': this.name});
       }else{
    
       this.router.navigate(['/']);
     }
 
     if(this.dataService.userObj){
      
     }
  }

  ngAfterViewInit() {
    this.name = this.dataService.getValues()['name'];
    this.dateofBirth = this.dataService.getValues()['dob'];
    //this.router.navigate(['/']);
  }

  calc(dob){
    this.dhms = this.time.calculateTime(dob);
    this.dDays = this.dhms['days'];
    this.dHours = this.dhms['hours'];
    this.dMins = this.dhms['mins'];
    this.dSecs = this.dhms['secs'];

    setInterval(()=> {
      this.dhms = this.time.calculateTime(dob);  
      this.dDays = this.dhms['days'];
      this.dHours = this.dhms['hours'];
      this.dMins = this.dhms['mins'];
      this.dSecs = this.dhms['secs'];    
    },1000)    
  }

}


