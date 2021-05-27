import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MyListingsPageRoutingModule } from './my-listings-routing.module';

import { MyListingsPage } from './my-listings.page';
import { Ng2SearchPipeModule } from 'ng2-search-filter';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MyListingsPageRoutingModule,
    Ng2SearchPipeModule
  ],
  declarations: [MyListingsPage]
})
export class MyListingsPageModule {}
