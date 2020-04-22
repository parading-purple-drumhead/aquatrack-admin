import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { Storage } from '@ionic/storage';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { AlertController } from '@ionic/angular';


@Component({
  selector: 'app-resetpw',
  templateUrl: './resetpw.page.html',
  styleUrls: ['./resetpw.page.scss'],
})
export class ResetpwPage implements OnInit {

  constructor(private router: Router, private formBuilder: FormBuilder, private http: HttpClient, private storage: Storage, private alert: AlertController) { 
    this.loginForm = this.formBuilder.group({
      password: new FormControl('', Validators.compose([
        Validators.required,
        Validators.pattern('^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])[a-zA-Z0-9!@#$%]+$'),
        Validators.minLength(8),
        Validators.maxLength(15),
      ])),
      confirmpassword: new FormControl('', Validators.compose([
        Validators.required,
        Validators.pattern('^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])[a-zA-Z0-9!@#$%]+$'),
        Validators.minLength(8),
        Validators.maxLength(15),
      ])),
      oldpassword: new FormControl('', Validators.compose([
        Validators.required
        ,
      ])),

    });
    
  }

  AccessToken: any;

  ngOnInit() {
    this.storage.get('AccessToken').then((val) => {
      this.AccessToken = val;
    });
  }
  loginForm: FormGroup;
  error_messages = {
    'password': [
      {type : 'pattern', message: 'Password must contain atleast 1 Uppercase, Lowercase and Special Character'},
      { type: 'required', message: 'Please enter the new password' },
      { type: 'minlength', message: 'Minimum password length is 8.' },
      { type: 'maxlength', message: 'Password should not exceed 15 letters' }
    ],
 
    'confirmpassword': [
      {type : 'pattern', message: 'Password must contain atleast 1 Uppercase, Lowercase and Special Character'},
      { type: 'required', message: 'Please enter the confirm password' },
      { type: 'minlength', message: 'Minimum password length is 8.' },
      { type: 'maxlength', message: 'Password should not exceed 15 letters' }
    ],
    'oldpassword': [
      { type: 'required', message: 'Please enter your old password' }
    ]
  }
  changePass(form){
    const Password = form.value.oldpass;
    const NewPassword = form.value.password;
    const confirmpassword = form.value.confirmpassword;
    const AccessToken = this.AccessToken;
    const data = {
      Password,
      NewPassword,
      AccessToken
    }
    if(NewPassword==confirmpassword)
    {this.http.post('http://ec2-15-206-171-244.ap-south-1.compute.amazonaws.com:80/ChangePassword', data, {responseType: 'text'}).subscribe(
      rdata => {
        console.log(rdata);
        if (rdata === "True"){
          this.router.navigate(['/login']);
        }
      }
    )}
    else{
      alert("Confirm password is not equal to password")
    }


  }

} 
