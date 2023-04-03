import { FormGroup, FormControl } from '@angular/forms';
import { ChallengeOrderBy } from '../models';

export const loginForm = new FormGroup({
  'username': new FormControl(''),
  'password': new FormControl(''),
  'remember': new FormControl<boolean>(false)
});

export const signupForm = new FormGroup({
  'username': new FormControl<string>(''),
  'email': new FormControl<string>(''),
  'password': new FormControl(<string>''),
  'password_confirm': new FormControl<string>(''),
  'agreements': new FormControl<boolean>(false)
});

export const searchForm = new FormGroup({
  'orderBy': new FormControl<ChallengeOrderBy>(ChallengeOrderBy.ALPHABETICAL),
  'title': new FormControl<string>(''),
});

export const groupForm = new FormGroup({
  'name': new FormControl<string>(''),
  'join_type_option_free': new FormControl<boolean>(true),
  'join_type_option_ask': new FormControl<boolean>(false)
});

export const banishmentForm = new FormGroup({
  'reason': new FormControl<string>(''),
  'blacklist': new FormControl<boolean>(true)
});

export const ratingCriteriaForm = new FormGroup({
  'name': new FormControl<string>(''),
  'description': new FormControl<string>(''),
  'weight': new FormControl<number>(1)
});

export const messageForm = new FormGroup({
  message: new FormControl<string>(''),
});

