import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CusFooterComponent } from './cus-footer.component';

describe('CusFooterComponent', () => {
  let component: CusFooterComponent;
  let fixture: ComponentFixture<CusFooterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CusFooterComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CusFooterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
