import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SectionChatsComponent } from './section-chats.component';

describe('SectionChatsComponent', () => {
  let component: SectionChatsComponent;
  let fixture: ComponentFixture<SectionChatsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SectionChatsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SectionChatsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
