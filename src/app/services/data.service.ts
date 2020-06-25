import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DataService {
/** Initializing variables */
  name = "";
  dateofBirth = "";
  uid="";
  nlist = new Array();
  journal = new Array();
  loggedin : boolean = false;
  userObj : any;

  constructor() { }

  setValue(name: string, dob: string){
    this.name = name;
    this.dateofBirth = dob;
  }

  setObj(obj){
    this.userObj = obj;
    this.name = obj.avatar;
    this.dateofBirth = obj.dateofBirth;
    this.uid = obj.uid;
    if(obj.nlist){
      this.nlist = obj.nlist;
    }
    else{
      this.nlist = new Array()
    }
    if(obj.journal){
      this.journal = obj.journal
    }
    else{
      this.journal = new Array()
    }  
  }

  resetObjects(){
    this.userObj = null;
    this.name = "";
    this.dateofBirth = "";
    this.uid = "";
    this.nlist = new Array();
    this.journal = new Array(); 
  }

  getValues(){
    return  {
      'name' : this.name, 
      'dob': this.dateofBirth
    }
  }

  /**  Not to do list operations */

  addListItem(item){
    const i = {
      item : item,
      status : 'Active',
      createdDate : new Date().toDateString(),
      index : new Date().getTime(),
      updatedDate : ""
    }
    this.nlist.push(i);
  }

  getList(){
    const activeList = new Array();
    this.nlist.forEach(( value ) => {
      if(value['status']=='Active'){
        activeList.push({'item': value['item'],'id': value['index']});
      }
    });
    return activeList;
  }

  removeListItem(uid,item){
    const i = {
      item : item,
      status : 'Deleted',
      updatedDate : new Date().toDateString(),
      id : uid
    }
    this.nlist.forEach( (value, index) =>{
      if(value['index']==uid){
        this.nlist.splice(index,1,i);
      }
    })
    // console.log(`Printing updated list - ${JSON.stringify(this.nlist)}`)
    // this.dataService.nlist = this.notList;
  }


  /** Journal Operations */

  addJournalItem(item,datetime){
    const i = {
      item : item,
      datetime : datetime,
      status : 'Active',
      createdDate : new Date().toDateString(),
      index : new Date().getTime(),
      updatedDate : ""
    }
    this.journal.push(i);
  }
  
  getJournal(){
    const activeList = new Array()
    this.journal.forEach(( value ) => {
      if(value['status']=='Active'){
        activeList.push({'item': value['item'],'date': value['datetime'],'id': value['index']});
      }
    });
    return activeList;
  }
  
  removeJournalItem(uid,item){
    const i = {
      item : item,
      status : 'Deleted',
      updatedDate : new Date().toDateString(),
      id : uid
    }
    
    this.journal.forEach( (value, index) =>{
      if(value['index']==uid){
        this.journal.splice(index,1,i);
      } 
    })
    
  }
  


}
