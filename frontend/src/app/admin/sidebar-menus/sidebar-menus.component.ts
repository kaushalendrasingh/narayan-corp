import { Router } from '@angular/router';
import { AuthService } from './../../auth.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-sidebar-menus',
  templateUrl: './sidebar-menus.component.html',
  styleUrls: ['./sidebar-menus.component.css']
})
export class SidebarMenusComponent implements OnInit {

  constructor(private auth : AuthService, private router : Router) { }

  ngOnInit(): void {
  }
  logout(){
    this.auth.logout();
    this.router.navigate(['/admin']);
  }
}
