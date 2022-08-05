import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateairlineComponent } from './createairline.component';

describe('CreateairlineComponent', () => {
  let component: CreateairlineComponent;
  let fixture: ComponentFixture<CreateairlineComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreateairlineComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateairlineComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
