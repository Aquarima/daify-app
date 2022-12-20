import {AfterViewInit, Component, ElementRef, OnInit, QueryList, ViewChild, ViewChildren} from '@angular/core';
import {FormControl, FormGroup} from '@angular/forms';
import {
  ACCESS_TOKEN,
  ACCESS_TOKEN_EXPIRY,
  AuthService,
  REFRESH_TOKEN,
  REFRESH_TOKEN_EXPIRY
} from 'src/app/core/services/auth.service';
import {CookieService} from "ngx-cookie";
import {Router} from "@angular/router";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit, AfterViewInit {

  @ViewChild('login_error') errorMessageLabel!: ElementRef;
  @ViewChildren("text_input") textInputs!: QueryList<ElementRef>;

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

  ngAfterViewInit(): void {
    this.initTextInputsListeners();
  }

  private initTextInputsListeners() {
    this.textInputs.forEach(input => {
      const inputElement = input.nativeElement;
      const parentNode = inputElement.parentNode;
      inputElement.addEventListener('focus', () => {
        parentNode.classList.add('active')
      });
      inputElement.addEventListener('focus', () => {
        parentNode.classList.add('active')
      });
      inputElement.addEventListener('focusout', () => {
        if (inputElement.value === '') parentNode.classList.remove('active');
      });
    });
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
