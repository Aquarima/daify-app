import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SectionGroupsComponent } from './section-groups.component';

describe('SectionGroupsComponent', () => {
  let component: SectionGroupsComponent;
  let fixture: ComponentFixture<SectionGroupsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SectionGroupsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SectionGroupsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
