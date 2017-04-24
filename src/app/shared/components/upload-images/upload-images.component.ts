import {Component, OnInit, Output, EventEmitter} from '@angular/core';
import {FormBuilder, FormGroup} from "@angular/forms";
import {ToursService} from "../../services/tours.service";
import * as firebase from "firebase"

@Component({
  selector: 'app-upload-images',
  templateUrl: './upload-images.component.html',
  styleUrls: ['./upload-images.component.scss']
})
export class UploadImagesComponent implements OnInit {
  file;
  fileName;
  @Output() uploadedFileUrlTrigger = new EventEmitter;

  constructor(public fb:FormBuilder,
              public toursService:ToursService) { }

  ngOnInit() {

  }

  onUploadfFile(event) {
    this.file = event.srcElement.files[0];
    if(this.file.name.indexOf(' ')!= -1)this.fileName = this.file.name.split(' ').join('');
    else this.fileName = this.file.name;
    console.log('this.file',this.file);
  }

  saveFiles(){
    let self = this;
    firebase.storage().ref('firstFile').child(this.fileName).put(this.file).then(function(snapshot) {
      firebase.storage().ref(snapshot['a'].fullPath).getDownloadURL().then((path)=>{
        self.uploadedFileUrlTrigger.emit(path);
        console.log('pathh',path);
      });
    });
  }

}
