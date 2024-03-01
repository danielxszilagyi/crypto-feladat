import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

import { IndexedDbService } from './services/indexedDB.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],
  template: `<router-outlet></router-outlet>`,
  styles: [``],
})
export class AppComponent {
  title = 'crypto-feladat';

  constructor(private indexedDbService: IndexedDbService) {
    this.indexedDbService;
  }
}
