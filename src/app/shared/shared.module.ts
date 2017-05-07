import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Ng2ImgToolsModule } from 'ng2-img-tools';

import { PaginationComponent } from './pagination/pagination.component';
import { UploadImagesComponent } from './components/upload-images/upload-images.component';
import { ModalUsualComponent } from './components/modal-usual/modal-usual.component';
import { UploadFilesMultipleComponent } from './components/upload-files-multiple/upload-files-multiple.component';
import { ObjectToCollectionPipe } from './pipes/object-to-collection.pipe';
import { DefineCityListPipe } from './pipes/define-city-list.pipe'

@NgModule({
  imports: [
    CommonModule,
    Ng2ImgToolsModule
  ],
  declarations: [
    PaginationComponent,
    UploadImagesComponent,
    ModalUsualComponent,
    UploadFilesMultipleComponent,
    ObjectToCollectionPipe,
    DefineCityListPipe
  ],
  exports: [
    PaginationComponent,
    UploadImagesComponent,
    ModalUsualComponent,
    UploadFilesMultipleComponent,
    ObjectToCollectionPipe,
    DefineCityListPipe
  ]
})
export class SharedModule { }
