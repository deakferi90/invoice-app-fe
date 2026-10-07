import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewInvoiceComponent } from './new-invoice';

describe('NewInvoice', () => {
  let component: NewInvoiceComponent;
  let fixture: ComponentFixture<NewInvoiceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NewInvoiceComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(NewInvoiceComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
