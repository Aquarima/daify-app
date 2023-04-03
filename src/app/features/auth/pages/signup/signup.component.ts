import {Component, ElementRef, OnInit, QueryList, ViewChild, ViewChildren} from '@angular/core';
import {AuthService} from 'src/app/core/services/auth.service';
import {signupForm} from "../../../../core/helpers";

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {

  @ViewChild('login_error') loginError$Message!: ElementRef;
  @ViewChildren("text_input") textInputs!: QueryList<ElementRef>;

  signupForm = signupForm;
  errors: any = {};
  success: boolean = false;

  constructor(private authService: AuthService) {
  }

  ngOnInit(): void {
  }

  onSubmit() {
  }
}
