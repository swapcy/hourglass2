import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TimeService {

  constructor() { }
  calculateTime(date){

    var convert = date.split('/');
    var convertedDate = new Date(convert[1]+'/'+convert[0]+'/'+convert[2]).getTime();
    // console.log(convertedDate);    
    var currentdate = new Date().getTime();
    var diff = Math.abs(currentdate - convertedDate);
    var _diff = this.secondsToDhms(diff);
    return _diff
  }
  secondsToDhms(miliseconds) {

    var seconds = Number(miliseconds/1000);
    var d = Math.floor(seconds / (3600*24));
    var h = Math.floor(seconds % (3600*24) / 3600);
    var m = Math.floor(seconds % 3600 / 60);
    var s = Math.floor(seconds % 60);
    
    var dDisplay = d > 0 ? d + (d == 1 ? " " : " ") : "";
    var hDisplay = h > 0 ? h + (h == 1 ? " " : " ") : "0";
    var mDisplay = m > 0 ? m + (m == 1 ? " " : " ") : "0";
    var sDisplay = s > 0 ? s + (s == 1 ? " " : " ") : "0";
    
    return {'days':dDisplay, 'hours': hDisplay, 'mins': mDisplay, 'secs': sDisplay};
  }

}
