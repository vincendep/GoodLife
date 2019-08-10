import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AlimentiPage } from './alimenti.page';

describe('AlimentiPage', () => {
  let component: AlimentiPage;
  let fixture: ComponentFixture<AlimentiPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AlimentiPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AlimentiPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
