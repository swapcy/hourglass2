import { Component, OnInit } from '@angular/core';
import { DataService } from 'src/app/services/data.service';
import { AuthService } from 'src/app/services/auth.service';
import { PwaService } from 'src/app/services/Pwa.service'
import { Router } from '@angular/router';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss']
})
export class NavComponent implements OnInit {

  constructor(private dataService : DataService, public auth: AuthService, public Pwa : PwaService, private router: Router) {
    
   }

  ngOnInit() {
  }

  setObj(user){
    this.dataService.setObj(user)
  }

}
