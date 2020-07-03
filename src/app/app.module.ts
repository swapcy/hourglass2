//Standard libraries
import { BrowserModule } from '@angular/platform-browser';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { MatNativeDateModule, MAT_DATE_LOCALE, MatDatepickerModule } from '@angular/material';
import { FormsModule, ReactiveFormsModule} from '@angular/forms';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule, NoopAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';

//firebase
import { AngularFireModule } from '@angular/fire'
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { AngularFireAnalyticsModule   } from '@angular/fire/analytics';

//lottie
import { LottieModule } from 'ngx-lottie';
import player from 'lottie-web';
import { LottieAnimationViewModule } from 'ng-lottie';

//re-captcha
import { RecaptchaModule,RecaptchaFormsModule } from 'ng-recaptcha';

//components
import { WhoamiComponent } from './components/whoami/whoami.component';
import { AmiloggedinComponent } from './components/amiloggedin/amiloggedin.component';
import { WhatistimeComponent } from './components/whatistime/whatistime.component';
import { ListsComponent } from './components/lists/lists.component';
import { JournalComponent } from './components/journal/journal.component';
import { NavComponent } from './components/nav/nav.component';
import { DataService } from './services/data.service';
import { TimeService } from './services/time.service';
import { AuthService } from './services/auth.service';
import { environment } from 'src/environments/environment';
import { ServiceWorkerModule } from '@angular/service-worker';
import { PwaService } from './services/Pwa.service';
import { ContactComponent } from './components/contact/contact.component';
import { EditComponent } from './components/edit/edit.component';

export function playerFactory() {
  return player;
}

@NgModule({
  declarations: [
    AppComponent,
    WhoamiComponent,
    AmiloggedinComponent,
    WhatistimeComponent,
    ListsComponent,
    JournalComponent,
    NavComponent,
    ContactComponent,
    EditComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    NoopAnimationsModule,
    AppRoutingModule,
    FormsModule, 
    ReactiveFormsModule,
    MatDatepickerModule,
    MatNativeDateModule,
    AngularFireModule,
    AngularFireAnalyticsModule,
    AngularFirestoreModule,
    AngularFireAuthModule,
    RecaptchaModule,
    RecaptchaFormsModule,
    LottieModule.forRoot({ player: playerFactory }),
    LottieAnimationViewModule.forRoot(),
    AngularFireModule.initializeApp(environment.firebaseConfig),
    ServiceWorkerModule.register('ngsw-worker.js', { enabled: environment.production })
  ],
  exports: [
    MatDatepickerModule,
    MatNativeDateModule

  ],
  schemas: [
    CUSTOM_ELEMENTS_SCHEMA
  ],
  providers: [
    DataService, 
    TimeService, 
    AuthService, 
    PwaService,
    {provide: MAT_DATE_LOCALE, useValue: 'en-GB'}
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
