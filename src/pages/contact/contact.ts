import { Component } from '@angular/core';
import { NavController,App } from 'ionic-angular';
import { AuthProvider } from '../../providers/auth/auth';

@Component({
  selector: 'page-contact',
  templateUrl: 'contact.html'
})
export class ContactPage {

  constructor(
  	public navCtrl: NavController,
    public auth : AuthProvider,
    public app: App,
  	) {

  }

  closeSession(){
      this.auth.logout();
  }

}
