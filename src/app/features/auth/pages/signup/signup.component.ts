import { AfterViewInit, Component, ElementRef, OnInit, QueryList, ViewChild, ViewChildren } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { AuthService } from 'src/app/core/services/auth.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit, AfterViewInit {

  @ViewChild('login_error') loginErrorMessage!: ElementRef;
  @ViewChildren("text_input") textInputs!: QueryList<ElementRef>;

  signupForm = new FormGroup({
    username: new FormControl(''),
    email: new FormControl(''),
    password: new FormControl(''),
    password_confirm: new FormControl(''),
    agreements: new FormControl<boolean>(false)
  })

  errors: string[] = [];

  constructor(private authService: AuthService) { }

  ngOnInit(): void { }

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
    this.errors = this.authService.register(`${this.signupForm.value.username}`, `${this.signupForm.value.email}`, `${this.signupForm.value.password}`);
  }
}
