import {Component, ElementRef, OnInit, QueryList, ViewChild, ViewChildren} from '@angular/core';
import {FormControl, FormGroup} from '@angular/forms';
import {AuthService} from 'src/app/core/services/auth.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {

  @ViewChild('login_error') loginError$Message!: ElementRef;
  @ViewChildren("text_input") textInputs!: QueryList<ElementRef>;

  signupForm: FormGroup = new FormGroup({
    username: new FormControl(''),
    email: new FormControl(''),
    password: new FormControl(''),
    password_confirm: new FormControl(''),
    agreements: new FormControl<boolean>(false)
  })

  errors: any = {};
  success: boolean = false;

  constructor(private authService: AuthService) {
  }

  ngOnInit(): void {
  }

  onSubmit() {
    const entries = this.signupForm.value;
    const confirmValid = entries.password_confirm === entries.password;
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
    this.success = true;
  }
}
