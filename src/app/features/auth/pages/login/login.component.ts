import { AfterViewInit, Component, ElementRef, OnInit, QueryList, ViewChild, ViewChildren } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { AuthService } from 'src/app/core/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit, AfterViewInit {

  @ViewChild('login_error') loginErrorMessage!: ElementRef;
  @ViewChildren("text_input") textInputs!: QueryList<ElementRef>;

  loginForm = new FormGroup({
    username: new FormControl(''),
    password: new FormControl(''),
    remember: new FormControl<boolean>(false)
  })

  constructor(private authService: AuthService) { }

  ngOnInit(): void { }

  ngAfterViewInit(): void {
    this.authService.loginError.subscribe(error => {
      if (error) {
        this.loginErrorMessage.nativeElement.classList.add('login-error-shown');
      }
    });
    this.initTextInputsListeners();
  }

  private initTextInputsListeners() {
    this.textInputs.forEach(input => {
      const inputElement = input.nativeElement;
      const parentNode = inputElement.parentNode;
      inputElement.addEventListener('focus', () => { parentNode.classList.add('active') });
      inputElement.addEventListener('focusout', () => {
        if (inputElement.value === '') parentNode.classList.remove('active');
      });
    });
  }

  onSubmit() {
    this.authService.login(`${this.loginForm.value.username}`, `${this.loginForm.value.password}`);
  }

  onHideError() {
    this.loginErrorMessage.nativeElement.classList.remove('login-error-shown');
  }
}
