import { Component, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';

import { MaterialModule } from './material.module';

import { TabComponent } from './components/tabs-view/tab/tab.component';
import { IndexedDbService } from './services/indexedDB.service';
IndexedDbService;

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, MaterialModule, TabComponent],
  template: `<router-outlet></router-outlet>`,
  styles: [``],
})
export class AppComponent {
  title = 'crypto-feladat';
  constructor(private indexedDbService: IndexedDbService) {
    this.indexedDbService;
  }
}

// `https://rest.coinapi.io/v1/exchangerate/${'BTC'}/USD?apikey=F5344750-F538-435A-B927-340D1EDE10DD`
