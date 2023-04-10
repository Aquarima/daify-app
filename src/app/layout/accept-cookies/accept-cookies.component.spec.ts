import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AcceptCookiesComponent } from './accept-cookies.component';

describe('AcceptCookiesComponent', () => {
  let component: AcceptCookiesComponent;
  let fixture: ComponentFixture<AcceptCookiesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AcceptCookiesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AcceptCookiesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
