import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BanishmentViewComponent } from './banishment-view.component';

describe('BanishmentViewComponent', () => {
  let component: BanishmentViewComponent;
  let fixture: ComponentFixture<BanishmentViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BanishmentViewComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BanishmentViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
