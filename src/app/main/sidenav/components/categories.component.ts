import { CommonModule } from '@angular/common';
import { Subscription } from 'rxjs';
import { MaterialModule } from '../../../material.module';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { User } from '../../../models/user.model';
import { AssetIcon } from '../../../models/symbol.model';

import { UserService } from '../../../services/user.service';
import { FavouritesService } from '../../../services/favourites.service';
import { TabService } from '../../../services/tab.service';

export interface CategoryData {
  categoryTitle: string;
  elements?: element[];
}
interface element {
  name: string;
}

@Component({
  selector: 'app-categories',
  standalone: true,
  imports: [CommonModule, MaterialModule],
  template: `
    <!-- Title -->
    <p class="mt-5 mb-2 fs-5">{{ categoryData.categoryTitle }}</p>
    <mat-divider></mat-divider>

    <!-- Element -->
    <div
      *ngFor="let fav of favs$; index as index"
      class="element d-flex flex-row justify-content-between align-items-center  mt-1 ps-2 p-1"
    >
      <div class="d-flex align-items-center">
        <img [src]="provideIcon(fav.asset_id_base)?.url" class="favIcon me-2" />
        <span class="">{{ fav.asset_id_base }}</span>
      </div>
      <!-- close btn -->
      <div (click)="removeFav(index, fav.asset_id_base)">
        <mat-icon class="element__icon fs-5 opacity-25">close</mat-icon>
      </div>
    </div>
  `,
  styles: `
  .element{
    transition: background-color 0.3s;
    &:hover{
    background-color: #eee;
    transition: background-color 0.3s;
    }
  }
  .element__icon{
      cursor: pointer;
      transition: all 0.2s;
      &:hover{
        opacity:55%!important;
        transform: scale(1.1);
    }
}
.favIcon{
  width: 0.8rem;
  height: 0.8rem;
}

    `,
})
export class CategoriesComponent implements OnInit, OnDestroy {
  @Input() categoryData!: CategoryData;

  userObjSub: Subscription;
  favSub: Subscription;
  userObj$!: User | any;
  favs$!: any;

  constructor(
    private favouritesService: FavouritesService,
    private userService: UserService,
    private snackBar: MatSnackBar,
    private tabService: TabService
  ) {
    this.userObjSub = this.userService.loggedInUser$.subscribe((data) => {
      this.userObj$ = data;
      if (this.userObj$.username) {
        this.favouritesService.refreshFavs(this.userObj$.username);
      }
    });
    this.favSub = this.favouritesService.favourites$.subscribe((data) => {
      this.favs$ = data;
    });
  }

  /**
   * Finds the icon data for a given asset_id_base in tabService.
   * @param asset_id_base
   * @returns Icon data
   */
  provideIcon(asset_id_base: string): AssetIcon | undefined {
    return this.tabService.provideIcons(asset_id_base);
  }

  /**
   * Removes a favorite from the user's favorites list and updates the database.
   * Opens a snackbar to notify the user.
   * @param index
   * @param asset_id_base
   */
  removeFav(index: number, asset_id_base: string) {
    this.favouritesService.removeFav(this.userObj$.username, index);
    this.snackBar.open(`${asset_id_base} removed from favorites!`, 'Dismiss', {
      duration: 1800,
    });
  }

  ngOnInit(): void {
    // console.log(this.userObjFavs$.favourites);
  }
  ngOnDestroy(): void {
    this.userObjSub.unsubscribe();
    this.favSub.unsubscribe();
  }
}
