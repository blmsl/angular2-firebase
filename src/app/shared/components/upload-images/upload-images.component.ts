import {Component, OnInit, Output, Input, EventEmitter, OnChanges} from '@angular/core';
import {FormBuilder, FormGroup} from "@angular/forms";
import {ToursService} from "../../services/tours.service";
import { Ng2ImgToolsService } from 'ng2-img-tools';
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
              private ng2ImgToolsService: Ng2ImgToolsService) { }

  ngOnInit() {

  }
  ngOnChanges() {
    if(this.tourId) {
      console.log('trigger on')
      this.saveFiles(this.tourId)
    }
  }

  onUploadfFile(event) {

    this.ng2ImgToolsService.resize([event.srcElement.files[0]], 400, 400).subscribe(result => {
      console.info(result);
      if(result.name.indexOf(' ')!= -1)this.fileName = result.name.split(' ').join('');
      else this.fileName = result.name;
      this.file = result;
    }, error => {
      //use result.compressedFile or handle specific error cases individually
    });

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
        self.uploadedFileUrlTrigger.emit(path)
      } );

    });
  }

}
