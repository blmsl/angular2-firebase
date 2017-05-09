import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Ng2ImgToolsModule } from 'ng2-img-tools';
import { MaterializeModule } from 'ng2-materialize';

import { PaginationComponent } from './pagination/pagination.component';
import { UploadImagesComponent } from './components/upload-images/upload-images.component';
import { ModalUsualComponent } from './components/modal-usual/modal-usual.component';
import { UploadFilesMultipleComponent } from './components/upload-files-multiple/upload-files-multiple.component';
import { ObjectToCollectionPipe } from './pipes/object-to-collection.pipe';
import { DefineCityListPipe } from './pipes/define-city-list.pipe';
import { SpinnerComponent } from './components/spinner/spinner.component'

@NgModule({
  imports: [
    CommonModule,
    Ng2ImgToolsModule,
    MaterializeModule.forRoot()
  ],
  declarations: [
    PaginationComponent,
    UploadImagesComponent,
    ModalUsualComponent,
    UploadFilesMultipleComponent,
    ObjectToCollectionPipe,
    DefineCityListPipe,
    SpinnerComponent
  ],
  exports: [
    PaginationComponent,
    UploadImagesComponent,
    ModalUsualComponent,
    UploadFilesMultipleComponent,
    ObjectToCollectionPipe,
    DefineCityListPipe,
    SpinnerComponent
  ]
})
export class SharedModule { }
