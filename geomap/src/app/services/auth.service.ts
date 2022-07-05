import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import * as moment from "moment";
import { tap, shareReplay } from 'rxjs/operators'


@Injectable({
  providedIn: 'root'
})
export class AuthService {
	public errors: any = [];
	constructor(private http: HttpClient) { }
//store token to session variable
	setSession(authResult: any) {
	  const token = authResult.token;
	  const token_parts = token.split(/\./);
	// console.log(token_parts)
	  const token_decoded = JSON.parse(window.atob(token_parts[1]));
	  const expiresAt = moment().add(token_decoded.exp ,'second');
	  localStorage.setItem("expires_at", JSON.stringify(expiresAt.valueOf()) );
	  localStorage.setItem('token', authResult.token);
	}
// Authentication using email and password
	authenticate(email: String, password: String) {
		return this.http.post(
			environment.host+'api/account/token/',
			{ email, password }
		).pipe(
			tap(response =>
		this.setSession(response)),
			shareReplay(),
		);

	}
//logout function
	logout() {
		localStorage.removeItem('token');
		// localStorage.removeItem('expires_at');
	}
  	public isLoggedIn() {
		return localStorage.getItem('token')!=null
		return moment().isBefore(this.getExpiration());
		
	}
	getExpiration() {
		const expiration:any = localStorage.getItem("expires_at");
		const expiresAt = JSON.parse(expiration);
		return moment(expiresAt);
	}    
	
}
