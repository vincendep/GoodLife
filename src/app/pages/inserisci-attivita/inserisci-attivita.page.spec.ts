import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InserisciAttivitaPage } from './inserisci-attivita.page';

describe('InserisciAttivitaPage', () => {
  let component: InserisciAttivitaPage;
  let fixture: ComponentFixture<InserisciAttivitaPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InserisciAttivitaPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InserisciAttivitaPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
