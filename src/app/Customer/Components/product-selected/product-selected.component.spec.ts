import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductSelectedComponent } from './product-selected.component';

describe('ProductSelectedComponent', () => {
  let component: ProductSelectedComponent;
  let fixture: ComponentFixture<ProductSelectedComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProductSelectedComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductSelectedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
