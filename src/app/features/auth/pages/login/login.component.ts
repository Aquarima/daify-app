import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {AuthService} from 'src/app/core/services/auth.service';
import {CookieService} from "ngx-cookie";
import {Router} from "@angular/router";
import {loginForm} from "../../../../core/helpers";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  @ViewChild('login_error') errorMessageLabel!: ElementRef;

  error: string = '';
  loginForm = loginForm;

  constructor(private router: Router, private cookies: CookieService, private authService: AuthService) {
  }

  ngOnInit(): void {
  }

  onSubmit() {
    const username = this.loginForm.get('username')?.value;
    const password = this.loginForm.get('password')?.value;
    if (username && password) {
      this.doTryLogin({username, password});
    }
  }

  onError() {
    this.errorMessageLabel.nativeElement.classList.add('login-error-shown');
  }

  onHideError() {
    this.errorMessageLabel.nativeElement.classList.remove('login-error-shown');
  }

  doTryLogin(form: {username: string, password: string}) {
    this.error = this.authService.login(form);
    if (this.error) {
      this.onError();
    } else {
      this.router.navigate([this.authService.redirectPath]);
    }
  }
}
