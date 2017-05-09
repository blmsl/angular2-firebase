import {Component, OnInit, Output, Input, EventEmitter, OnChanges} from '@angular/core';
import {FormBuilder, FormGroup} from "@angular/forms";
import {ToursService} from "../../services/tours.service";
import { Ng2ImgToolsService } from 'ng2-img-tools';
import { ProcessHandlerService } from "../../services/process-handler.service"
import * as firebase from "firebase"
import * as _ from "lodash"

@Component({
  selector: 'app-upload-files-multiple',
  templateUrl: './upload-files-multiple.component.html',
  styleUrls: ['./upload-files-multiple.component.scss']
})
export class UploadFilesMultipleComponent implements OnInit, OnChanges {
  @Input() tourId;
  @Output() uploadedMultipleFilesTrigger = new EventEmitter;
  files:any[]=[];
  filesUrls:any[]=[];

  constructor(public fb:FormBuilder,
              public toursService:ToursService,
              private ng2ImgToolsService: Ng2ImgToolsService,
  public processHandlerService:ProcessHandlerService) { }

  ngOnInit() {
  }

  ngOnChanges() {
    if(this.tourId) {
      console.log('trigger files on');
      this.saveFiles(this.tourId)
    }
  }

  onSelectImages(event) {
    console.log("event",event);
    let files = event.srcElement.files;
    let filesArray = [];
    _.map(files,file=>filesArray.push(file));

    this.cropFile(filesArray);
    event = null;
  }

  cropFile(files) {
    this.processHandlerService.start();
    this.ng2ImgToolsService.resizeExactCrop(files, 800,400 ).subscribe(result => {
      this.processHandlerService.start();
      console.log('result crop',result);
      this.files.push(result);
      this.processHandlerService.done();
    }, error => {console.log(error)});
  }

  saveFiles(tourId){
    let self = this;
    let metadata = {
      customMetadata: {
        parentFolder:`tours-images/${tourId}/fullImages`
      }
    };
    this.files.forEach((file)=>{
      firebase.storage().ref(metadata.customMetadata.parentFolder).child(file.name).put(file,metadata).then(function(snapshot) {
        let downloadedFilePath = snapshot['a'].fullPath;
        firebase.storage().ref(downloadedFilePath).getDownloadURL().then((path)=> {
          console.log('path',path);
          self.filesUrls.push(path);
        } );
        self.uploadedMultipleFilesTrigger.emit(self.filesUrls)
      });
    })
  }

}
