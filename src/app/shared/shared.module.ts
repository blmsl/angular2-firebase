import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Ng2ImgToolsModule } from 'ng2-img-tools';

import { PaginationComponent } from './pagination/pagination.component';
import { UploadImagesComponent } from './components/upload-images/upload-images.component';
import { ModalUsualComponent } from './components/modal-usual/modal-usual.component';
import { UploadFilesMultipleComponent } from './components/upload-files-multiple/upload-files-multiple.component'

@NgModule({
  imports: [
    CommonModule,
    Ng2ImgToolsModule
  ],
  declarations: [
    PaginationComponent,
    UploadImagesComponent,
    ModalUsualComponent,
    UploadFilesMultipleComponent
  ],
  exports: [
    PaginationComponent,
    UploadImagesComponent,
    ModalUsualComponent,
    UploadFilesMultipleComponent
  ]
})
export class SharedModule { }
