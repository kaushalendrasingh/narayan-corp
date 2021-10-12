import { AuthService } from './../auth.service';
import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {

  constructor(private router : Router, private auth :AuthService) { }

  ngOnInit(): void {
    if(this.auth.isAdminUserLoggedIn()){
      this.router.navigate(['/admin/dashboard']);
      if('admin/dashboard' === this.router.url){
        this.router.routeReuseStrategy.shouldReuseRoute = function () {
          return false;
        };
      }
    } else {
      this.router.navigate(['/admin']);
    }
  }

}
