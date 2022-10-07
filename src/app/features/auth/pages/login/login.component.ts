import { AfterViewInit, Component, ElementRef, OnInit, QueryList, ViewChild, ViewChildren } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { AuthService } from 'src/app/core/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit, AfterViewInit {

  @ViewChild('login_error') loginError$Message!: ElementRef;
  @ViewChildren("text_input") textInputs!: QueryList<ElementRef>;

  loginForm = new FormGroup({
    username: new FormControl(''),
    password: new FormControl(''),
    remember: new FormControl<boolean>(false)
  })

  constructor(private authService: AuthService) { }

  ngOnInit(): void { }

  ngAfterViewInit(): void {
    this.authService.loginError$.subscribe(error => {
      if (error) {
        this.loginError$Message.nativeElement.classList.add('login-error-shown');
      }
    });
    this.initTextInputsListeners();
  }

  private initTextInputsListeners() {
    this.textInputs.forEach(input => {
      const inputElement = input.nativeElement;
      const parentNode = inputElement.parentNode;
      inputElement.addEventListener('focus', () => { parentNode.classList.add('active') });
      inputElement.addEventListener('focus', () => { parentNode.classList.add('active') });
      inputElement.addEventListener('focusout', () => {
        if (inputElement.value === '') parentNode.classList.remove('active');
      });
    });
  }

  onSubmit() {
    const identifier = this.loginForm.value.username;
    if (identifier?.includes('@')) {
      this.authService.login({email: `${this.loginForm.value.username}`, password:`${this.loginForm.value.password}`});
      return;
    }
    this.authService.login({username: `${this.loginForm.value.username}`, password:`${this.loginForm.value.password}`});
  }

  onHideError() {
    this.loginError$Message.nativeElement.classList.remove('login-error-shown');
  }
}
