import {Component, OnInit} from '@angular/core';
import {AuthService, User} from "../../../../core";
import {CountryService} from "../../../../core/services/country.service";
import {map, mergeMap, toArray} from "rxjs";
import {FormControl, FormGroup} from "@angular/forms";

@Component({
  selector: 'app-user-settings',
  templateUrl: './user-settings.component.html',
  styleUrls: ['./user-settings.component.scss']
})
export class UserSettingsComponent implements OnInit {

  userSettingsForm = new FormGroup({
    firstName: new FormControl(''),
    lastName: new FormControl(''),
    email: new FormControl(''),
    about: new FormControl(''),
    profession: new FormControl(''),
    country: new FormControl(''),
  });

  initialUserSettingsForm: any;

  user: User = {} as User;
  section: string = 'profile';
  countries: { key: string, value: any }[] = [];

  constructor(private authService: AuthService, private countryService: CountryService) {
  }

  ngOnInit(): void {
    this.authService.user$.subscribe(user => {
      this.user = user;
      this.initUserSettingsForm();
    });
    this.fetchCountries();
  }

  initUserSettingsForm() {
    const user: User = this.user;
    if (!user.profile) return;
    this.userSettingsForm.setValue({
      firstName: user.profile.firstName,
      lastName: user.profile.lastName,
      email: user.email,
      about: user.profile.about,
      profession: user.profile.profession,
      country: user.profile.country,
    });
    this.initialUserSettingsForm = this.userSettingsForm.value;
  }

    onSection(section: string) {
        if (!this.availableSections.includes(section)) {
            section = this.availableSections[0];
            this.router.navigate([`../${section}`], {relativeTo: this.route});
        }
        this.section = section;
    }

  isOnSection(section: string) {
    return this.section === section;
  }

  isUserSettingsFormChanged(): boolean {
    return JSON.stringify(this.userSettingsForm.value) !== JSON.stringify(this.initialUserSettingsForm);
  }

  private fetchCountries() {
    this.countryService.getCountries()
      .pipe(
        mergeMap(countries => countries.sort((a: any, b: any) => a.name.common.localeCompare(b.name.common))),
        map((country: any) => ({
          key: country.name.common,
          value: country.cca2
        })),
        toArray()
      )
      .subscribe(countries => {
        this.countries = countries;
      });
  }

  get banner(): string {
    return this.user.profile?.bannerUrl || '/assets/user_banner_placeholder.svg';
  }

  get avatar(): string {
    return this.user.profile?.avatarUrl || '/assets/avatar_placeholder.svg';
  }

  get allCountries(): { key: string, value: any }[] {
    return this.countries;
  }
}
