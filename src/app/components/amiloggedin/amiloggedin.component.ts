import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-amiloggedin',
  templateUrl: './amiloggedin.component.html',
  styleUrls: ['./amiloggedin.component.scss']
})
export class AmiloggedinComponent implements OnInit {
  public g_icon = require("src\/app\/components\/assets\/g-text.png");
  public f_icon = require("src\/app\/components\/assets\/f-text.png");
  public t_icon = require("src\/app\/components\/assets\/t-text.png");

  constructor() { }

  ngOnInit() {
  }

}
