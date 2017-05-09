import {Component, OnInit, Output, Input, EventEmitter, OnChanges} from '@angular/core';
import {FormBuilder, FormGroup} from "@angular/forms";
import {ToursService} from "../../services/tours.service";
import { Ng2ImgToolsService } from 'ng2-img-tools';
import { ProcessHandlerService } from "../../services/process-handler.service"
import * as firebase from "firebase"

@Component({
  selector: 'app-upload-images',
  templateUrl: './upload-images.component.html',
  styleUrls: ['./upload-images.component.scss']
})
export class UploadImagesComponent implements OnInit, OnChanges {
  file;
  fileName;
  @Input() tourId;
  @Output() uploadedFileUrlTrigger = new EventEmitter;

  constructor(public fb:FormBuilder,
              public toursService:ToursService,
              private ng2ImgToolsService: Ng2ImgToolsService,
              public processHandlerService:ProcessHandlerService) { }

  ngOnInit() {

  }
  ngOnChanges() {
    if(this.tourId) {
      console.log('trigger on');
      this.saveFiles(this.tourId)
    }
  }

  onUploadfFile(event) {
    let file = event.srcElement.files[0];
    this.cropFile(file);
    event = null;
  }

  cropFile(file) {
    console.log('filer income',file);
    this.processHandlerService.start();
    this.ng2ImgToolsService.resizeExactCrop([file], 640,480 ).subscribe(result => {
      console.log('result crop',result);
      if(result.name.indexOf(' ')!= -1)this.fileName = result.name.split(' ').join('');
      else this.fileName = result.name;
      this.file = result;
      this.processHandlerService.done();
    }, error => {console.log(error)});
  }

  saveFiles(tourId){
    let self = this;
    let metadata = {
      customMetadata: {
        parentFolder:`tours-images/${tourId}`,
        fileName:this.fileName
      }
    };
    firebase.storage().ref(metadata.customMetadata.parentFolder).child(this.fileName).put(this.file,metadata).then(function(snapshot) {
      let downloadedFilePath = snapshot['a'].fullPath;
      console.log('snapshot',snapshot);
      firebase.storage().ref(downloadedFilePath).getDownloadURL().then((path)=> {
        console.log('path',path);
        self.file = null;
        self.fileName = null;
        self.uploadedFileUrlTrigger.emit(path)
      } );

    });
  }

}
