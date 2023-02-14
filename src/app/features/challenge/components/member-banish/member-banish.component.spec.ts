import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MemberBanishComponent } from './member-banish.component';

describe('MemberBanishComponent', () => {
  let component: MemberBanishComponent;
  let fixture: ComponentFixture<MemberBanishComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MemberBanishComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MemberBanishComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
