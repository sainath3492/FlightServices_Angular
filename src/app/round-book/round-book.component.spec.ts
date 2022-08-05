import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RoundBookComponent } from './round-book.component';

describe('RoundBookComponent', () => {
  let component: RoundBookComponent;
  let fixture: ComponentFixture<RoundBookComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RoundBookComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RoundBookComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
