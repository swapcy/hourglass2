import { Component, OnInit } from '@angular/core';
import { DataService } from 'src/app/services/data.service';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss']
})
export class NavComponent implements OnInit {

  constructor(private dataService : DataService, public auth: AuthService) { }

  ngOnInit() {
  }

  setObj(user){
    this.dataService.setObj(user)
  }

}
