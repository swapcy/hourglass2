import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { WhoamiComponent } from './components/whoami/whoami.component';
import { WhatistimeComponent } from './components/whatistime/whatistime.component';
import { ListsComponent } from './components/lists/lists.component';
import { JournalComponent } from './components/journal/journal.component';
import { AmiloggedinComponent } from './components/amiloggedin/amiloggedin.component';

const routes: Routes = [
  {
    path: '',
    component: WhoamiComponent,
  },
  {
    path: 'time',
    component: WhatistimeComponent,
    data: { animation: 'isRight' }
  },
  {
    path: 'list',
    component: ListsComponent,
    data: { animation: 'isRight' }
  },
  {
    path: 'journal',
    component: JournalComponent,
  },
  {
    path: 'login',
    component: AmiloggedinComponent,
  }

];

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forRoot(routes)
  ],
  exports: [
    RouterModule
  ]
})
export class AppRoutingModule { }
