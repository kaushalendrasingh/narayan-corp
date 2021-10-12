import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FInvoicesComponent } from './f-invoices.component';

describe('FInvoicesComponent', () => {
  let component: FInvoicesComponent;
  let fixture: ComponentFixture<FInvoicesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FInvoicesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FInvoicesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
