import {Component, Input, OnInit} from '@angular/core';
import { ProcessHandlerService } from "../../services/process-handler.service"

@Component({
  selector: 'app-spinner',
  templateUrl: './spinner.component.html',
  styleUrls: ['./spinner.component.scss']
})
export class SpinnerComponent implements OnInit {
  constructor(public processHandlerService:ProcessHandlerService) { }

  ngOnInit() {
  }


}
