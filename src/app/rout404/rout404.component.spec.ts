import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Rout404Component } from './rout404.component';

describe('Rout404Component', () => {
  let component: Rout404Component;
  let fixture: ComponentFixture<Rout404Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Rout404Component]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Rout404Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
