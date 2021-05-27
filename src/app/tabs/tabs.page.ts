import { Component } from '@angular/core';
import { LoadingController } from '@ionic/angular';
import { HomePage } from '../pages/home/home.page';
import { MyListingsPage } from '../pages/my-listings/my-listings.page';
import { ProfilePage } from '../pages/profile/profile.page';

@Component({
  selector: 'app-tabs',
  templateUrl: 'tabs.page.html',
  styleUrls: ['tabs.page.scss']
})
export class TabsPage {

  constructor(
    public loadingController: LoadingController

  ) {}

  async presentLoading() {
    const loading = await this.loadingController.create({
      cssClass: 'my-custom-class',
      message: 'Please wait...',
      duration: 2000
    });
    await loading.present();

    const { role, data } = await loading.onDidDismiss();
    console.log('Loading dismissed!');
  }

}
