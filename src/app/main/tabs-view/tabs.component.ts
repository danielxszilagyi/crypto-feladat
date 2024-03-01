import { Component, OnDestroy, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { FormControl } from '@angular/forms';
import { Subscription } from 'rxjs';
import { MaterialModule } from '../../material.module';

import { TabComponent } from './tab-layout/tab.component';

import { UserService } from '../../services/user.service';
import { TabService } from '../../services/tab.service';
import { FavouritesService } from '../../services/favourites.service';

import { AssetIcon, CryptoSymbol } from '../../models/symbol.model';
import { User } from '../../models/user.model';

@Component({
  selector: 'app-tabs',
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
      <!-- Home tab -->
      @if(tabs.length === 0){

      <mat-tab>
        <ng-template mat-tab-label>
          <mat-icon> home </mat-icon>
        </ng-template>
        <mat-divider></mat-divider>
        <div class="p-3">
          <div class="row py-5">
            <div
              id="homeHello"
              class="col col-sm-11 col-md-10 col-xl-9 col-xxl-8 mx-auto text-center"
            >
              <h1>
                Hey <span>{{ loggedInUser$?.username | titlecase }}</span
                >!
              </h1>
              <h2 class=" fw-normal mb-5">Lets add some tabs.</h2>
              <img class="opacity-50" [src]="'./assets/hello.svg'" />
            </div>
          </div>
        </div>
      </mat-tab>
      }
      <!-- Render Tabs -->
      @for (tab of tabs; track $index) {
      <mat-tab class="border-bottom" label="{{ tab }}">
        <!-- close btn -->
        <ng-template mat-tab-label>
          <img
            [src]="provideIcon(tab.asset_id_base)?.url"
            class="tabIcon me-1"
          />
          <span>{{ tab.symbol_id_exchange }}</span>
          <mat-icon class="fs-6 ps-2 tabCloseIcon" (click)="removeTab($index)"
            >close</mat-icon
          >
        </ng-template>
        <!-- tab content -->
        <ng-template matTabContent>
          <mat-divider></mat-divider>
          <div class="p-4">
            <app-tab [data]="tab" (favEvent)="handleFav($event)"></app-tab>
          </div>
        </ng-template>
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
      #homeHello {
        h1 {
          font-size: 2.5rem;
          span {
            color: #673ab7;
          }
        }
        h2 {
          font-size: 1.5rem;
        }
      }
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
      .tabIcon {
        width: 0.9rem;
        height: 0.9rem;
        filter: grayscale(100%);
      }
    `,
  ],
})
export class TabsComponent implements OnInit, OnDestroy {
  selected = new FormControl(0);
  menuSub!: Subscription;
  symbolsForMenu: CryptoSymbol[] = [];
  tabSub!: Subscription;
  tabs!: Symbol[] | any;
  loggedInUserSub!: Subscription;
  loggedInUser$!: User | null;
  iconData!: AssetIcon | undefined;

  constructor(
    private userService: UserService,
    private tabService: TabService,
    private favServ: FavouritesService
  ) {
    this.tabSub = this.tabService.tabs$.subscribe((tabs) => {
      this.tabs = tabs;
    });
    this.menuSub = tabService.getSymbols().subscribe({
      next: (data) => {
        this.symbolsForMenu = data;
      },
      error: (error) => {
        console.error(error);
      },
    });
  }

  provideIcon(asset_id_base: string): AssetIcon | undefined {
    return this.tabService.provideIcons(asset_id_base);
  }

  /**
   * Add a new tab to the tab list and update the database.
   * Set the selected tab to the last one.
   * @param chosenSymbol
   */
  add(chosenSymbol: CryptoSymbol): void {
    const username = this.loggedInUser$?.username;
    this.tabService.addTab(username!, chosenSymbol);

    setTimeout(() => {
      this.selected.setValue(this.tabs.length - 1);
    }, 99);
  }

  /**
   * Remove tab from the tab list by index and update the database.
   * Set the selected tab to the last one.
   * @param index
   */
  removeTab(index: number): void {
    const username = this.loggedInUser$?.username;
    // this.tabs.splice(index, 1);
    this.tabService.removeTab(username!, index);
    this.selected.setValue(this.tabs.length - 1);
  }

  /**
   * Add symbol to favourites in the database
   */
  handleFav(symbol: CryptoSymbol): void {
    if (!symbol) return;
    this.favServ.addFav(this.loggedInUser$?.username!, symbol);
    // this.userService.addFavorite(symbol);
  }

  ngOnInit(): void {
    // this.tabService.getTabs();
    this.loggedInUserSub = this.userService.loggedInUser$.subscribe((user) => {
      this.loggedInUser$ = user;
    });
  }

  ngOnDestroy(): void {
    this.userService.saveTabs(this.tabs);

    this.menuSub.unsubscribe();
    this.tabSub.unsubscribe();
    this.loggedInUserSub.unsubscribe();
  }
}

// `https://rest.coinapi.io/v1/exchangerate/${'BTC'}/USD?apikey=F5344750-F538-435A-B927-340D1EDE10DD`
