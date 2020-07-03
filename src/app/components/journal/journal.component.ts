import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';
import { DataService } from 'src/app/services/data.service';
import { AngularFireAnalytics } from '@angular/fire/analytics';

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
    private auth : AuthService,
    private analytics : AngularFireAnalytics
  ) { }

  ngOnInit() {
    if(this.dataService.getValues()['dob']){
      this.itemList = (this.dataService.getJournal()).reverse();
      this.analytics.logEvent('Journal', {"Journal_entries": JSON.stringify(this.itemList)})
    }else{
      this.router.navigate(['/']);
    }
  }

  async addtoList(item){

    this.dataService.addJournalItem(this.listItem,this.dateInput);
    this.itemList = (this.dataService.getJournal()).reverse();
    this.analytics.logEvent("Journal_added", {"item":this.listItem});
    if(this.dataService.userObj){
      this.auth.updateData(this.dataService.userObj)
    }
    item.reset();
  }

  removeItem(item){

    this.dataService.removeJournalItem(item.id,item.item);
    this.itemList = (this.dataService.getJournal()).reverse();
    this.analytics.logEvent("Journal_Removed", {"item":item.item});

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
