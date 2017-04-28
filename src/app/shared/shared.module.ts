import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Ng2ImgToolsModule } from 'ng2-img-tools';

import { PaginationComponent } from './pagination/pagination.component';
import { UploadImagesComponent } from './components/upload-images/upload-images.component';
import { ModalUsualComponent } from './components/modal-usual/modal-usual.component'

@NgModule({
  imports: [
    CommonModule,
    Ng2ImgToolsModule
  ],
  declarations: [
    PaginationComponent,
    UploadImagesComponent,
    ModalUsualComponent
  ],
  exports: [
    PaginationComponent,
    UploadImagesComponent,
    ModalUsualComponent
  ]
})
export class SharedModule { }
