import { Component, OnInit } from '@angular/core';
import { ConfigService } from '../services/Api';
import { DataService } from "../services/app-data-service";
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})

export class MenuComponent implements OnInit {
  MenuItems = [];
  subscription: Subscription;

  constructor(private _apiService: ConfigService,
    private _dataService: DataService) {}

  ngOnInit() {
    this._dataService.getItems().subscribe(items => this.MenuItems = items);

    if (this.MenuItems.length == 0) {
      this._apiService.getMenuItem().subscribe(data => {
        if (data && data.items.length > 0) {
          this.MenuItems = data.items;
          this._dataService.setItems(data.items);
        }
      });
    }
  }

}
