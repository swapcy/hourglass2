import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { FormControl } from '@angular/forms';
import { AngularFirestore } from '@angular/fire/firestore';
import { AngularFireAnalytics } from '@angular/fire/analytics';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss']
})
export class ContactComponent implements OnInit {
  titlesubject = "";
  contentbody = "";
  YOUR_SITE_KEY = '6LdKpKsZAAAAAImJKuThBU7xTQ87aGzS88AAv4mo';
  myform = new FormControl();
  datasubmitted: boolean = false;
  recaptchavalue = "";


  constructor(
    private afs: AngularFirestore,
    private analytics: AngularFireAnalytics
  ) { }

  ngOnInit(): void {
  }

  resolved(captchaResponse: string) {
    // console.log(`Resolved captcha with response: ${captchaResponse}`);
}



  onClickContinue(myformvalues){
    console.log(`Printing values :${this.titlesubject}, ${this.contentbody}, ${this.recaptchavalue}`)
    this.updateReview();
    myformvalues.reset();
    this.analytics.logEvent('Suggestion', {'title': this.titlesubject})
  }

  async updateReview(){
    let data : any;
    data = {
      title: this.titlesubject,
      desc: this.contentbody,
      datePosted: new Date().toDateString()
    }

    this.afs.collection('suggestions').add(data);
    
  }

}
