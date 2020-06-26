import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-amiloggedin',
  templateUrl: './amiloggedin.component.html',
  styleUrls: ['./amiloggedin.component.scss']
})
export class AmiloggedinComponent implements OnInit {
  public g_icon = require("src\/app\/components\/assets\/g-text.png");
  public f_icon = require("src\/app\/components\/assets\/f-text.png");
  public t_icon = require("src\/app\/components\/assets\/t-text.png");

  constructor(public auth : AuthService, private router : Router) { }

  ngOnInit() {
  }

  googleLogin(){
    this.auth.googleSignin();


  }

  facebookLogin(){
    this.auth.facebookSignin();

    
  }

  async twitterLogin(){
    const resp = await this.auth.twitterSignin()
    const uid = resp.uid;
 
  }

}
