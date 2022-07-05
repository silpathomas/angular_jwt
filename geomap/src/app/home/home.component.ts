import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
	ngOnInit() {
		// this.isLoggedin = this.authService.isLoggedIn();
		// if(!this.isLoggedin) {
		// 	this.router.navigateByUrl('login');
		// }
	}
  }


