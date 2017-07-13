import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import { ToursService } from '../../../shared/services/tours.service';

@Component({
  selector: 'app-orders-list',
  templateUrl: './orders-list.component.html',
  styleUrls: ['./orders-list.component.scss'],

})
export class OrdersListComponent implements OnInit {
  public ordersList;
  constructor(private tourService: ToursService) { }

  ngOnInit() {
    this.getOrdersList();
  }

  getOrdersList() {
    this.tourService.list('orders/anonymous').subscribe((response) => {
      console.log('response', response);
      this.ordersList = response;

      setTimeout(() => {
        $('.collapsible').collapsible();
        $('.tooltipped').tooltip({delay: 50});
      }, 200);
    });
  }

}
