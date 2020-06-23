import { Component, OnInit } from '@angular/core';
import { PopoverController, AlertController, ModalController } from '@ionic/angular';
import { AppPopOverComponent } from '../app-pop-over/app-pop-over.component';
import { HttpClient } from '@angular/common/http';
import { AddUserPage } from './add-user/add-user.page';
import { UserInfoPage } from './user-info/user-info.page';


@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})
export class Tab3Page implements OnInit {

  constructor(private popover: PopoverController, private http: HttpClient, private alrtCtrl: AlertController,
    private modal: ModalController) { }

  ngOnInit() {
    this.userList();
  }

  // users = new Array();
  users = [
    {
      name: 'Sudhanshu Basu Roy',
      email: 'sb2479@srmist.edu.in',
      admin: 'Yes'
    },
    {
      name: 'Sudhanshu Basu Roy',
      email: 'sb2479@srmist.edu.in',
      admin: 'Yes'
    },
    {
      name: 'Sudhanshu Basu Roy',
      email: 'sb2479@srmist.edu.in',
      admin: 'Yes'
    },
    {
      name: 'Sudhanshu Basu Roy',
      email: 'sb2479@srmist.edu.in',
      admin: 'Yes'
    },
    {
      name: 'Sudhanshu Basu Roy',
      email: 'sb2479@srmist.edu.in',
      admin: 'Yes'
    },
  ]

  userList() {
    const data = {};
    this.http.post('http://ec2-15-206-171-244.ap-south-1.compute.amazonaws.com:80/listUsers', data, { responseType: 'text' }).subscribe(
      rdata => {
        this.users = new Array();
        console.log(rdata);
        let snapshot = JSON.parse(rdata);
        snapshot.Users.forEach((instance) => {
          let user = {
            'name': instance.Attributes[1].Value,
            'email': instance.Attributes[2].Value,
            'admin': instance.Attributes[3].Value,
          };
          // console.log(user);
          this.users.push(user);
        })
        console.log(this.users);
      });
  }

  async addUser() {
    const modal = await this.modal.create({
      component: AddUserPage,
      cssClass: 'addUser',
      mode: 'ios',
    });
    await modal.present();
    modal.onDidDismiss().then(res => {
      this.userList();
    })
  }

  async showUserInfo(name, email, admin) {
    // console.log(name, email, admin);
    const modal = await this.modal.create({
      component: UserInfoPage,
      componentProps: {
        'name': name,
        'email': email,
        'admin': admin,
      },
      cssClass: 'userInfo',
      mode: 'ios',
    });
    await modal.present();
    modal.onDidDismiss().then(res => {
      this.userList();
    })
  }

  async openPopOver(event) {
    const popover = await this.popover.create({
      component: AppPopOverComponent,
      event
    });
    return await popover.present();
  }
}