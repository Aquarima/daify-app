import { AfterViewInit, Component, ElementRef, OnInit, QueryList, ViewChild, ViewChildren } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { AuthService } from 'src/app/core/services/auth.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit, AfterViewInit {

  @ViewChild('login_error') loginError$Message!: ElementRef;
  @ViewChildren("text_input") textInputs!: QueryList<ElementRef>;

  signupForm = new FormGroup({
    username: new FormControl(''),
    email: new FormControl(''),
    password: new FormControl(''),
    password_confirm: new FormControl(''),
    agreements: new FormControl<boolean>(false)
  })

  errors: any = {};

  constructor(private authService: AuthService) { }

  ngOnInit(): void {
    this.authService.signupError.subscribe(errors => {
      this.errors = errors;
    })
  }

  ngAfterViewInit(): void {
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
    const entries = this.signupForm.value;
    const confirmValid =  entries.password_confirm === entries.password;
    const agreementsValid = entries.agreements === true;
    if (confirmValid && agreementsValid) {
      this.authService.register(`${this.signupForm.value.username}`, `${this.signupForm.value.email}`, `${this.signupForm.value.password}`);
      return;
    }
    if (!confirmValid) {
      this.errors.confirm = "Password and confirmation are not the same";
    }
    if (!agreementsValid) {
      this.errors.agreements = "Before creating an account you must accept our Terms";
    }
  }
}
