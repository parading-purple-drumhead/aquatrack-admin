import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute, Router, Data } from '@angular/router';
import { NavController, AlertController, PopoverController, ModalController } from '@ionic/angular';
import { Storage } from '@ionic/storage';
import { AppPopOverComponent } from '../app-pop-over/app-pop-over.component';
import { FCM } from '@ionic-native/fcm/ngx';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page implements OnInit {

  toggleStatus: boolean;

  constructor(private fcm: FCM, private http: HttpClient, private router: Router, public navCtrl: NavController, public activeRoute: ActivatedRoute,
    private storage: Storage, private alert: AlertController, private popover: PopoverController, private modal: ModalController, private datepipe: DatePipe) {
    this.building = "All";
  }

  // arrayData: Array<Data>
  arrayData = [
    {
      Building: 'UB',
      Floor: 1,
      location: 'CB',
      Complaint: 'Tap leak',
      Timestamp: this.datepipe.transform(Date.now(),'dd MMM, yy')
    },
    {
      Building: 'UB',
      Floor: 1,
      location: 'CB',
      Complaint: 'Tap leak',
      Timestamp: this.datepipe.transform(Date.now(),'dd MMM, yy')
    },
    {
      Building: 'UB',
      Floor: 1,
      location: 'CB',
      Complaint: 'Tap leak',
      Timestamp: this.datepipe.transform(Date.now(),'dd MMM, yy')
    },
    {
      Building: 'UB',
      Floor: 1,
      location: 'CB',
      Complaint: 'Tap leak',
      Timestamp: this.datepipe.transform(Date.now(),'dd MMM, yy')
    },
  ]
  buildNames: Array<Data>
  delArray: Array<String>
  username: string;
  building: any;
  showuser: any;
  empty: any;

  ngOnInit() {
    this.storage.get('user').then((val) => {
      console.log(val)
      this.username = val;
      console.log('Username:', this.username);
    });
    this.buildinglist();
    this.displayComplaints();
    // this.empty = 1;
    this.empty = 0;
  }

  checkTime() {
    const data = {};
    this.http.post('http://ec2-15-206-171-244.ap-south-1.compute.amazonaws.com:80/checkTime', data, { responseType: 'text' }).subscribe(
      rdata => {
        console.log(rdata);
      });
  }


  displayComplaints() {
    // this.arrayData = new Array();
    const data = {
      //Empty payload
    };
    this.http.post('http://ec2-15-206-171-244.ap-south-1.compute.amazonaws.com:80/complaint', data, { responseType: 'text' }).subscribe(
      rdata => {
        console.log(rdata);
        let temp = JSON.parse(rdata);
        if (temp.Complaints.Complaints === '') {
          this.empty = 1;
        }
        else if (temp.Complaints.Complaints !== '') {
          this.empty = 0;
          // this.arrayData = temp.Complaints;
        }
      }
    );
  }

  buildSelect(val: any) {
    console.log(val);
    this.building = val;
    var Building = this.building;
    if (Building === "All") {
      this.displayComplaints();
    }
    else if (Building === "My Complaints") {
      this.arrayData = new Array();
      this.storage.get('user').then((val) => {
        var Username = val;
        const data = {
          Username
        }
        this.http.post('http://ec2-15-206-171-244.ap-south-1.compute.amazonaws.com:80/usernamefilter', data, { responseType: 'text' }).subscribe(

          rdata => {
            console.log(rdata);
            let temp = JSON.parse(rdata);
            if (temp.Complaints.Complaints === '') {
              this.empty = 1;
            }
            else if (temp.Complaints.Complaints !== '') {
              this.empty = 0;
              this.arrayData = temp.Complaints;
            }
          }
        )
      })
    }
    else {
      this.arrayData = new Array();
      var Building;
      const data = {
        Building,// This adds it to the payload
      };
      this.http.post('http://ec2-15-206-171-244.ap-south-1.compute.amazonaws.com:80/filter', data, { responseType: 'text' }).subscribe(

        rdata => {
          console.log(rdata);
          let temp = JSON.parse(rdata);
          if (temp.Complaints.Complaints === '') {
            this.empty = 1;
          }
          else if (temp.Complaints.Complaints !== '') {
            this.empty = 0;
            this.arrayData = temp.Complaints;
          }
        }
      );
    }
  }

  buildinglist() {
    this.buildNames = new Array();
    const data = {
      // Empty payload
    };
    this.http.post('http://ec2-15-206-171-244.ap-south-1.compute.amazonaws.com:80/dropbuild', data, { responseType: 'text' }).subscribe(

      rdata => {
        console.log(rdata);
        let temp = JSON.parse(rdata);
        this.buildNames = temp.Building;
      }
    );
  }

  doRefresh(event) {
    console.log('Begin async operation');
    setTimeout(() => {
      console.log('Async operation has ended');
      this.buildSelect(this.building);
      event.target.complete();
    }, 500);
  }

  async openPopOver(event) {
    const popover = await this.popover.create({
      component: AppPopOverComponent,
      event
    });
    return await popover.present();
  }

  confirmJob(Building, Floor, location, Complaint, username) {
    this.storage.get('user').then((val) => {
      console.log(val);
      var loggedUsername = val;
      const data = {
        Building,
        Floor,
        location,
        Complaint,
        username,
        loggedUsername
      }
      console.log(data);
      this.http.post('http://ec2-15-206-171-244.ap-south-1.compute.amazonaws.com:80/Acknowledge', data, { responseType: 'text' }).subscribe(
        rdata => {
          console.log(rdata);
          this.displayComplaints();
        }
      );
      const notif = {
        username
      }

      this.http.post('http://ec2-15-206-171-244.ap-south-1.compute.amazonaws.com:80/Notification', notif, { responseType: 'text' }).subscribe(
        rdata => {
          console.log(rdata);
        }

      );
      this.fcm.onNotification().subscribe(data => {
        if (data.wasTapped) {
          this.router.navigate(['/tab2']);
        } else {
          console.log("Received in foreground");
        };
      });
    });
  }

  async alertJob(building, floor, location, complaint, username) {
    const alert = await this.alert.create({
      header: 'Confirm Job',
      message: 'Are you sure you want to confirm the job?',
      buttons: [{
        text: 'Cancel',
        role: 'cancel',
        handler: (cancel) => {
          console.log('Cancelled');
        }
      },
      {
        text: 'Okay',
        handler: () => {
          this.confirmJob(building, floor, location, complaint, username);
        }
      }
      ]
    });
    await alert.present();
    let result = await alert.onDidDismiss();
  }
}