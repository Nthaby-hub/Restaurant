import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.page.html',
  styleUrls: ['./dashboard.page.scss'],
})
export class DashboardPage implements OnInit {

  constructor( private rout: Router) { }

  sliderConfig = {
    slidesPerView: 1.2
  }

  ngOnInit() {
  }

  profile(){
    this.rout.navigateByUrl('rest-profile')
  }

  dishes(){
    this.rout.navigateByUrl('dishes')
  }

  reserv(){
    this.rout.navigateByUrl('reservations')
  }
  add(){
    this.rout.navigateByUrl('update')
  }
}
