import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BarberLogin } from './barber-login';

describe('BarberLogin', () => {
  let component: BarberLogin;
  let fixture: ComponentFixture<BarberLogin>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BarberLogin]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BarberLogin);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
