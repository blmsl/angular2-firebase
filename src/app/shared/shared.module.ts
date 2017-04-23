import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PaginationComponent } from './pagination/pagination.component';
import { UploadImagesComponent } from './components/upload-images/upload-images.component'

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [
    PaginationComponent,
    UploadImagesComponent
  ],
  exports: [
    PaginationComponent,
    UploadImagesComponent
  ]
})
export class SharedModule { }
