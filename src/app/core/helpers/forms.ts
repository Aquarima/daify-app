import { FormGroup, FormControl } from '@angular/forms';
import {AccessType, ChallengeOrderBy} from '../models';

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
  'message': new FormControl<string>(''),
});

export const challengeForm = new FormGroup({
  'title': new FormControl<string>(''),
  'description': new FormControl<string>(''),
  'theme': new FormControl<string>(''),
  'accessType': new FormControl<AccessType>(AccessType.FREE),
  'startsAt': new FormControl<Date>(new Date()),
  'endsAt': new FormControl<Date>(new Date()),
  'capacity': new FormControl<number>(2),
  'groupSize': new FormControl<number>(2),
  'leaderboardBeforeStart': new FormControl<boolean>(true),
  'spectatorsAllowed': new FormControl<boolean>(false),
  'votesStartsTime': new FormControl<Date>(new Date()),
  'votesEndsTime': new FormControl<Date>(new Date()),
  'depositsMin': new FormControl<number>(1),
  'depositsMax': new FormControl<number>(1)
});

export const cookiesPreferencesForm = new FormGroup({
  'necessary': new FormControl<boolean>(true),
  'functional': new FormControl<boolean>(false),
  'performance': new FormControl<boolean>(false),
});

