import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SongsModalPage } from './songs-modal.page';

describe('SongsModalPage', () => {
  let component: SongsModalPage;
  let fixture: ComponentFixture<SongsModalPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SongsModalPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SongsModalPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
