import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MemberKickComponent } from './member-kick.component';

describe('MemberKickComponent', () => {
  let component: MemberKickComponent;
  let fixture: ComponentFixture<MemberKickComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MemberKickComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MemberKickComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
