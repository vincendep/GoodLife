import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreaPastoPage } from './crea-pasto.page';

describe('CreaPastoPage', () => {
  let component: CreaPastoPage;
  let fixture: ComponentFixture<CreaPastoPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreaPastoPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreaPastoPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
