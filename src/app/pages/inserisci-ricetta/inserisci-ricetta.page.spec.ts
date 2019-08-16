import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InserisciRicettaPage } from './inserisci-ricetta.page';

describe('InserisciRicettaPage', () => {
  let component: InserisciRicettaPage;
  let fixture: ComponentFixture<InserisciRicettaPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InserisciRicettaPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InserisciRicettaPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
