import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Observable } from 'rxjs';
import { DataService } from 'src/app/services/data.service';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-lists',
  templateUrl: './lists.component.html',
  styleUrls: ['./lists.component.scss']
})
export class ListsComponent implements OnInit {
  listItem = "";
  myList = new FormControl(); 
  itemList = new Array();
  user$ : Observable<any>;
  loggedin = false;
  constructor(
    private dataService : DataService, 
    public auth : AuthService,
    private router : Router
  ) { }

  ngOnInit() {
    if(this.dataService.getValues()['dob']){
      this.itemList = (this.dataService.getList()).reverse();
      if(this.dataService.userObj){
        this.loggedin = true
      }
      else{
        this.loggedin = false
      }
    }else{
      this.router.navigate(['/']);
    }
  }

  async addtoList(item){

    this.dataService.addListItem(this.listItem);
    this.itemList = (this.dataService.getList()).reverse();
    if(this.dataService.userObj){
      this.auth.updateData(this.dataService.userObj)
    }
    item.reset();
    
    
  }

 
  removeItem(item){
    this.dataService.removeListItem(item.id,item.item);
    this.itemList = (this.dataService.getList()).reverse();
    if(this.dataService.userObj){
      this.auth.updateData(this.dataService.userObj)
    }
  }


}
