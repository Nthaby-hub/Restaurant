import { Component } from '@angular/core';
import { MenuController } from '@ionic/angular'
import { Router } from '@angular/router'

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  constructor(private menu: MenuController, private rout: Router) {}

  openCustom() {
    this.menu.enable(true, 'custom');
    this.menu.open('custom');
  }

  customer(){
    this.rout.navigateByUrl('login')
  }
  ownerLogin(){
    this.rout.navigateByUrl('a-login')
  }

}
