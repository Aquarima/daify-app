import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {FormControl, FormGroup} from '@angular/forms';
import {AuthService} from 'src/app/core/services/auth.service';
import {CookieService} from "ngx-cookie";
import {Router} from "@angular/router";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  @ViewChild('login_error') errorMessageLabel!: ElementRef;

  loginForm = new FormGroup({
    username: new FormControl(''),
    password: new FormControl(''),
    remember: new FormControl<boolean>(false)
  })

  errorMessage: string = '';

  constructor(private router: Router, private cookies: CookieService, private authService: AuthService) {
  }

  ngOnInit(): void {
  }

  onSubmit() {
    const identifier = this.loginForm.value.username;
    const email = identifier?.includes('@') ? `${this.loginForm.value.username}` : undefined;
    const username = email ? undefined : `${this.loginForm.value.username}`;
    this.errorMessage = this.authService.login({email: email, username: username, password: `${this.loginForm.value.password}`})
    this.errorMessageLabel.nativeElement.classList.add('login-error-shown');
    this.router.navigate([this.authService.redirectPath]);
  }

  onHideError() {
    this.errorMessageLabel.nativeElement.classList.remove('login-error-shown');
  }
}
