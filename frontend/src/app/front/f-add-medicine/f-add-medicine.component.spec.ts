import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FAddMedicineComponent } from './f-add-medicine.component';

describe('FAddMedicineComponent', () => {
  let component: FAddMedicineComponent;
  let fixture: ComponentFixture<FAddMedicineComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FAddMedicineComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FAddMedicineComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
