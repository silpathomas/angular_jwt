import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  email: string ='';
  password : string = '';
  error: string='';
  isLoggedin = false;
  constructor(private route: ActivatedRoute, private router: Router, private authService: AuthService) {}

    ngOnInit() {
        if(this.isLoggedin) {
        this.router.navigateByUrl('home');
        }
    }

    doLogin() {
        if(this.email == '' || this.password == '' 
        && this.password == null ) {
        this.error="Email and Password required";
        }
        if(this.email !== '' && this.email !== null && this.password !== '' && this.password !== null ) {
            this.authService.authenticate(this.email, this.password).subscribe({
            next: (result: any) => {
            this.router.navigate(['/home']);
            },
            error: (err: any) => {
                if(err.stack=401){
                this.error="Invalid Credentials";
                }
            },
                complete: () => {
                console.log('complete');
                }
            });
        }

    }
}
