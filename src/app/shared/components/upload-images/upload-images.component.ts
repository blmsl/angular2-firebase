import {Component, OnInit, Output, Input, EventEmitter, OnChanges} from '@angular/core';
import {FormBuilder, FormGroup} from "@angular/forms";
import {ToursService} from "../../services/tours.service";
import * as firebase from "firebase"

@Component({
  selector: 'app-upload-images',
  templateUrl: './upload-images.component.html',
  styleUrls: ['./upload-images.component.scss']
})
export class UploadImagesComponent implements OnInit, OnChanges {
  file;
  fileName;
  @Input() uploadTrigger;
  @Output() uploadedFileUrlTrigger = new EventEmitter;

  constructor(public fb:FormBuilder,
              public toursService:ToursService) { }

  ngOnInit() {

  }
  ngOnChanges() {
    if(this.uploadTrigger) {
      console.log('trigger on')
      this.saveFiles()
    }
  }

  onUploadfFile(event) {
    this.file = event.srcElement.files[0];
    if(this.file.name.indexOf(' ')!= -1)this.fileName = this.file.name.split(' ').join('');
    else this.fileName = this.file.name;
    console.log('this.file',this.file);
  }

  saveFiles(){
    let self = this;
    let metadata = {
      customMetadata: {
        scale:'400x400',
        folder:'400x400',
        parentFolder:`tours-images`,
        fileName:this.fileName
      }
    };
    firebase.storage().ref(metadata.customMetadata.parentFolder).child(this.fileName).put(this.file,metadata).then(function(snapshot) {
      let fullSizeImagePath = snapshot['a'].fullPath;
      let withCustomSizePath = `/${metadata.customMetadata.parentFolder}/${metadata.customMetadata.folder}/${metadata.customMetadata.fileName}`;

      firebase.storage().ref(withCustomSizePath).getDownloadURL().then((path)=> self.uploadedFileUrlTrigger.emit(path) );

    });
  }

}
