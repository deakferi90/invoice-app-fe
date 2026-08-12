import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Leftside } from './leftside';

describe('Leftside', () => {
  let component: Leftside;
  let fixture: ComponentFixture<Leftside>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Leftside]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Leftside);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
