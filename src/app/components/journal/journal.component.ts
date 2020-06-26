import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'app-journal',
  templateUrl: './journal.component.html',
  styleUrls: ['./journal.component.scss']
})
export class JournalComponent implements OnInit {

  minDate = new Date(1900, 0, 1);
  maxDate = new Date();
  dateInput = new Date();
  itemList = new Array();
  //postDate = this.dateInputsplit('\d\d\d\d')
  eventDate = "";
  listItem = ""

  constructor(
    private dataService: DataService,
    private router: Router,
    private auth : AuthService
  ) { }

  ngOnInit() {
    if(this.dataService.getValues()['dob']){
      this.itemList = (this.dataService.getJournal()).reverse();
    }else{
      this.router.navigate(['/']);
    }
  }

  async addtoList(item){

    this.dataService.addJournalItem(this.listItem,this.dateInput);
    this.itemList = (this.dataService.getJournal()).reverse();
    if(this.dataService.userObj){
      this.auth.updateData(this.dataService.userObj)
    }
    item.reset();
  }

  removeItem(item){

    this.dataService.removeJournalItem(item.id,item.item);
    this.itemList = (this.dataService.getJournal()).reverse();
    if(this.dataService.userObj){
      this.auth.updateData(this.dataService.userObj)
    }
  }

  updateListitem(item){
    this.listItem = item
  }


  setJournal(userObj){
    this.itemList = userObj.journal;
  }


}
