import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DailyOpeningsComponent } from './daily-openings.component';

describe('DailyOpeningsComponent', () => {
  let component: DailyOpeningsComponent;
  let fixture: ComponentFixture<DailyOpeningsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DailyOpeningsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DailyOpeningsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
