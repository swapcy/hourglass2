import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { slider } from 'src/app/services/route-animation';
import { SwUpdate } from '@angular/service-worker';;


@Component({
  selector: 'app-root',
  animations: [
    slider
  ],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'hourglass';

  constructor(updates : SwUpdate){
    updates.available.subscribe( event =>{
      updates.activateUpdate().then(()=> document.location.reload());
    });

    

  }

  prepareRoute(outlet: RouterOutlet) {
    return outlet && outlet.activatedRouteData && outlet.activatedRouteData['animation'];
  }
}
