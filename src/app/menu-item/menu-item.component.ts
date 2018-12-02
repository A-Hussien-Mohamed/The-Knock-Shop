import { Component, OnInit } from '@angular/core';
import { DataService } from '../services/app-data-service';
import { Router, ActivatedRoute } from '@angular/router';
import { ConfigService } from '../services/Api';
import { iif } from 'rxjs';
import { IfStmt } from '@angular/compiler';


@Component({
  selector: 'app-menu-item',
  templateUrl: './menu-item.component.html',
  styleUrls: ['./menu-item.component.sass']
})
export class MenuItemComponent implements OnInit {

  menuItem = {};
  quantity = 1;

  constructor(private _dataService: DataService,
    private _route: ActivatedRoute,
    private _apiService: ConfigService) { }

  ngOnInit() {

    this._route.params.subscribe(params => {
      if (params['id']) {
        this.menuItem = this._dataService.getMenuItem(params['id']);
        if (!this.menuItem) {
          this._apiService.getMenuItem().toPromise().then(data => {
            this.menuItem = data.items.find(x => x.id == params['id'])
          })
        }
      }
    });
  }

  addToBasket(item) {
    if (item) {
      item.quantity = this.quantity;
      
      this._dataService.addToBasket(item);
    }
    else {
      console.log("No Item Is pushed")
    }

  }

  increment() {
    this.quantity++;
  }
  decrement() {
    if (this.quantity !== 1) {
      this.quantity--;
    }
  }

}
