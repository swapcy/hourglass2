import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';
import { AngularFireAnalytics } from '@angular/fire/analytics';

@Component({
  selector: 'app-amiloggedin',
  templateUrl: './amiloggedin.component.html',
  styleUrls: ['./amiloggedin.component.scss']
})
export class AmiloggedinComponent implements OnInit {
  public g_icon = 'https://raw.githubusercontent.com/swapcy/Assets/master/g-text.png';
  public f_icon = 'https://raw.githubusercontent.com/swapcy/Assets/master/f-text.png';
  public t_icon = 'https://raw.githubusercontent.com/swapcy/Assets/master/t-text.png';

  constructor(public auth : AuthService, private router : Router, private analytics : AngularFireAnalytics) { }

  ngOnInit() {
    this.analytics.logEvent("Social_Login_Popup")
  }

  googleLogin(){
    this.auth.googleSignin();
    this.analytics.logEvent("Sign_in_with_google")
    // this.router.navigate(['time'])
  }

  facebookLogin(){
    this.auth.facebookSignin();
    this.analytics.logEvent("Sign_in_with_facebook")
    // this.router.navigate(['time'])
    
  }

  async twitterLogin(){
    const resp = await this.auth.twitterSignin()
    this.analytics.logEvent("Sign_in_with_twitter")
    this.router.navigate(['time'])
    const uid = resp.uid;
 
  }

}
