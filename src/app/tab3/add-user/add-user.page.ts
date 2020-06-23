import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { format } from 'url';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.page.html',
  styleUrls: ['./add-user.page.scss'],
})
export class AddUserPage implements OnInit {

  constructor(private modal: ModalController,private http: HttpClient) {
   }

  ngOnInit() {
  }

  adminStatus = false;
  addUser(form){
    const name = form.value.name;
    const email = form.value.email;
    const isAdmin = (form.value.adminStatus)? 'Yes': 'No';
    //adminCreateUser
    const data = {
      name,
      email,
      isAdmin
    }
    console.log(data);
    this.http.post('http://ec2-15-206-171-244.ap-south-1.compute.amazonaws.com:80/adminCreateUser',data,{responseType: 'text'}).subscribe(
      rdata => {
        console.log(rdata);
        this.dismissPage();
      }
    );
  }

  dismissPage(){
    this.modal.dismiss();
  }

}
