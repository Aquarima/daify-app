import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CookiesPreferencesComponent } from './cookies-preferences.component';

describe('CookiesPreferencesComponent', () => {
  let component: CookiesPreferencesComponent;
  let fixture: ComponentFixture<CookiesPreferencesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CookiesPreferencesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CookiesPreferencesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
