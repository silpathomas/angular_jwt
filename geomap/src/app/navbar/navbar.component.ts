import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent  implements OnInit {
	loggedinUser: string = '';
	constructor(private route: ActivatedRoute, private router: Router, private http: HttpClient, private authService: AuthService) {}
	ngOnInit() {
		const isLoggedin = this.authService.isLoggedIn();
		if(!isLoggedin) {
			this.router.navigateByUrl('login');
		}
	}
	doLogout() {
		this.authService.logout();
		this.router.navigateByUrl('login');
	}


}
