import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InserisciCiboPage } from './inserisci-cibo.page';

describe('InserisciCiboPage', () => {
  let component: InserisciCiboPage;
  let fixture: ComponentFixture<InserisciCiboPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InserisciCiboPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InserisciCiboPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
