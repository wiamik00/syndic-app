import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddResident } from './add-resident';

describe('AddResident', () => {
  let component: AddResident;
  let fixture: ComponentFixture<AddResident>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AddResident]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddResident);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
