import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ModalUsualComponent } from './components/modal-usual/modal-usual.component'

const sharedRoutes: Routes = [
  { path: 'alert-modal', outlet:'alertModal', component:  ModalUsualComponent },
];

@NgModule({
  imports: [
    RouterModule.forChild(sharedRoutes)
  ],
  exports: [
    RouterModule
  ]
})

export class SharedRoutingModule {}
