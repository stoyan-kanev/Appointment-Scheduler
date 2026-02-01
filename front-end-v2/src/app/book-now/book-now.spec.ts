import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BookNow } from './book-now';

describe('BookNow', () => {
  let component: BookNow;
  let fixture: ComponentFixture<BookNow>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BookNow]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BookNow);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
