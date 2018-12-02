import { Component } from '@angular/core';
import { DataService } from './services/app-data-service'
import { mergeAnimationOptions } from '@angular/animations/browser/src/util';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.sass']
})
export class AppComponent {

  basketItemsCount;
  subscription: Subscription;

  constructor(private _dataService: DataService) {
    if (!this.basketItemsCount) {
      let basketItems = JSON.parse(sessionStorage.getItem("basketItems"));
      this.basketItemsCount = basketItems && basketItems.length
    }
  }

  ngOnInit() {
    this.subscription = this._dataService.getBasketItems().subscribe(items => { this.basketItemsCount = items.length; });
  }

  ngOnDestroy() {
    // unsubscribe to ensure no memory leaks
    this.subscription.unsubscribe();
    sessionStorage.clear();
  }


}
