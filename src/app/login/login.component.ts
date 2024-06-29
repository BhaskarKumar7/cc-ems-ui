import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ApiService } from '../services/api.service';
import { StorageService } from '../services/storage.service';
import { ADMIN_NAME, TOKEN } from '../types/Constants';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private apiService:ApiService, 
    private storageService: StorageService,
    private router : Router) { }

  ngOnInit(): void {
  }

  userEmailId: String = "";
  userPassword: String = "";
  showError: boolean = false;
  errorMessage: string = '';

  loginTheUser(loginFormData : NgForm) {
    console.log(loginFormData.value);
    this.apiService.callLoginApi(loginFormData.value.userEmailId,loginFormData.value.userPassword).subscribe({
      next: respone => {
        this.showError = false;
        this.storageService.addItemToCache(TOKEN,respone.token);
        this.storageService.addItemToCache(ADMIN_NAME,respone.adminName);
        this.router.navigate(['/user/dashboard']);
      },
      error: errorResponse => {
        console.log(errorResponse);
        this.errorMessage = errorResponse.error.message;
        this.showError = true;
      }
    })

  }
}
