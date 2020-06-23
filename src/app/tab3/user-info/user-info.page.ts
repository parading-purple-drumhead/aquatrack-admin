import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-user-info',
  templateUrl: './user-info.page.html',
  styleUrls: ['./user-info.page.scss'],
})
export class UserInfoPage implements OnInit {

  constructor() { }

  ngOnInit() {
  }

  @Input() name: string;
  @Input() email: string;
  @Input() admin: string;
  
}
