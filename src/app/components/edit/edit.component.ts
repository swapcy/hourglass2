import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { DataService } from 'src/app/services/data.service';
import { AngularFireAnalytics } from '@angular/fire/analytics';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.scss']
})
export class EditComponent implements OnInit {
  username = "";
  userdateofbirth = "";
  uid = "";
  myform = new FormControl();
  
  constructor(private dataService: DataService, private analytics: AngularFireAnalytics, public auth: AuthService,public router: Router) { }

  ngOnInit(): void {
     this.username = this.dataService.getValues()['name'];
     this.userdateofbirth = this.dataService.getValues()['dob'];
     this.uid = this.dataService.getValues()['uid'];

     if(this.username && this.userdateofbirth)
     {
      
     }
     else{
       this.router.navigate(['/'])
     }
  }

  onClickContinue(myformvalues){
    this.dataService.setValue(this.username, this.userdateofbirth);
    this.analytics.logEvent('Edit',  {"dob": this.userdateofbirth})
    this.editDetails();
    myformvalues.reset();
  }

  editDetails(){
    this.auth.editDetail(this.dataService.userObj)
  }

}
