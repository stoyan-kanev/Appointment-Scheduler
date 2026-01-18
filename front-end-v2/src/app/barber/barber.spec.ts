import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Barber } from './barber';

describe('Barber', () => {
  let component: Barber;
  let fixture: ComponentFixture<Barber>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Barber]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Barber);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
