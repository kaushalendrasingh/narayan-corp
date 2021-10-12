import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FMedicineComponent } from './f-medicine.component';

describe('FMedicineComponent', () => {
  let component: FMedicineComponent;
  let fixture: ComponentFixture<FMedicineComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FMedicineComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FMedicineComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
