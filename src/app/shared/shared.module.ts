import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Ng2ImgToolsModule } from 'ng2-img-tools';
import { MaterializeModule } from 'ng2-materialize';
import { AgmCoreModule } from 'angular2-google-maps/core';

import { PaginationComponent } from './pagination/pagination.component';
import { UploadImagesComponent } from './components/upload-images/upload-images.component';
import { ModalUsualComponent } from './components/modal-usual/modal-usual.component';
import { UploadFilesMultipleComponent } from './components/upload-files-multiple/upload-files-multiple.component';
import { ObjectToCollectionPipe } from './pipes/object-to-collection.pipe';
import { DefineCityListPipe } from './pipes/define-city-list.pipe';
import { SpinnerComponent } from './components/spinner/spinner.component';
import { GoogleMapAutocompleteComponent } from './components/google-map-autocomplete/google-map-autocomplete.component'
import { ReactiveFormsModule } from '@angular/forms';
import { GoogleMapComponent } from './components/google-map-iframe/google-map.component';
import { TinymceTextareaComponent } from './components/tinymce-textarea/tinymce-textarea.component';

@NgModule({
  imports: [
    CommonModule,
    Ng2ImgToolsModule,
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyCmE9-b1osvrr9-s_YInV5ecRCvTCFt22A',
      libraries: ['places']
    }),
    MaterializeModule.forRoot(),
    ReactiveFormsModule
  ],
  declarations: [
    PaginationComponent,
    UploadImagesComponent,
    ModalUsualComponent,
    UploadFilesMultipleComponent,
    ObjectToCollectionPipe,
    DefineCityListPipe,
    SpinnerComponent,
    GoogleMapAutocompleteComponent,
    GoogleMapComponent,
    TinymceTextareaComponent
  ],
  exports: [
    PaginationComponent,
    UploadImagesComponent,
    ModalUsualComponent,
    UploadFilesMultipleComponent,
    ObjectToCollectionPipe,
    DefineCityListPipe,
    SpinnerComponent,
    GoogleMapAutocompleteComponent,
    GoogleMapComponent,
    TinymceTextareaComponent
  ]
})
export class SharedModule { }
