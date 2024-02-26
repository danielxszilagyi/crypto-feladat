import { Component, OnDestroy, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';

import { MaterialModule } from './material.module';
import { FormControl } from '@angular/forms';
import { Subscription } from 'rxjs';

import { TabComponent } from './components/tab.component';
import { TabService } from './services/tab.service';
import { Symbol } from './models/symbol.model';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, MaterialModule, TabComponent],
  template: `
    <mat-tab-group
      dynamicHeight
      mat-stretch-tabs="false"
      mat-align-tabs="start"
      animationDuration="200ms"
      [selectedIndex]="selected.value"
    >
      <mat-tab label="home">
        <h1>Lets add some tabs</h1>
        <button mat-raised-button (click)="httpget()">http</button>
      </mat-tab>
      @for (tab of tabs; track $index) {
      <mat-tab label="{{ tab }}">
        <!-- close btn -->
        <ng-template mat-tab-label>
          <span>{{ tab.symbol_id_exchange }}</span>
          <mat-icon class="fs-6 ps-2 tabCloseIcon" (click)="removeTab($index)"
            >close</mat-icon
          >
        </ng-template>
        <!-- content -->
        <app-tab [data]="tab"></app-tab>
      </mat-tab>
      }

      <!-- Add Button-->
      <mat-tab disabled>
        <ng-template mat-tab-label>
          <button
            style="pointer-events: all !important"
            mat-icon-button
            [matMenuTriggerFor]="menu"
          >
            <mat-menu #menu="matMenu">
              @for (symbol of symbolsForMenu; track $index){
              <button mat-menu-item (click)="add(symbol)">
                {{ symbol.asset_id_base }}
              </button>
              }
            </mat-menu>
            <mat-icon color="primary">add_box</mat-icon>
          </button>
        </ng-template>
      </mat-tab>
    </mat-tab-group>
  `,
  styles: [
    `
      .tabCloseIcon {
        cursor: pointer;
        transition: color 0.3s;
        &:hover {
          color: red;
          transition: color 0.3s;
          transition: transform 0.2s;
          transform: scale(1.1);
        }
      }
    `,
  ],
})
export class AppComponent implements OnInit, OnDestroy {
  title = 'crypto-feladat';
  selected = new FormControl(0);
  menuSub!: Subscription;
  symbolsForMenu: Symbol[] = [];
  tabSub!: Subscription;
  tabs: Symbol[] = [];
  // 'Asssd', 'Login', 'Register', 'Crypto', 'About'
  // dataFromParent = {
  //   name: 'name from parent',
  //   data: 'data from parent',
  // };

  constructor(private tabService: TabService) {
    this.tabSub = this.tabService.tabs.subscribe((tabs) => {
      this.tabs = tabs;
    });
    this.menuSub = tabService.getSymobols().subscribe({
      next: (data) => {
        this.symbolsForMenu = data;
      },
      error: (error) => {
        console.error(error);
      },
      complete: () => {
        this.menuSub.unsubscribe();
      },
    });
  }
  add(chosenSymbol: Symbol) {
    this.tabService.addTab(chosenSymbol);
    this.selected.setValue(this.tabs.length);
  }
  removeTab(index: number) {
    // this.tabs.splice(index, 1);
    this.tabService.removeTab(index);
    this.selected.setValue(this.tabs.length);
  }

  httpget() {
    this.tabService.getSymobols().subscribe({
      next: (data) => {
        console.table(data);
      },
      error: (error) => {
        console.error(error);
      },
      complete: () => {
        console.log('complete');
      },
    });
  }
  ngOnInit(): void {
    this.tabService.getTabs();
  }
  ngOnDestroy(): void {
    this.menuSub.unsubscribe();
    this.tabSub.unsubscribe();
  }
}

// `https://rest.coinapi.io/v1/exchangerate/${'BTC'}/USD?apikey=F5344750-F538-435A-B927-340D1EDE10DD`
