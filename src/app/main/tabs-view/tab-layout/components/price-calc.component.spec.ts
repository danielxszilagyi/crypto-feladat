import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PriceCalcComponent } from './price-calc.component';

describe('PriceCalcComponent', () => {
  let component: PriceCalcComponent;
  let fixture: ComponentFixture<PriceCalcComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PriceCalcComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PriceCalcComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
