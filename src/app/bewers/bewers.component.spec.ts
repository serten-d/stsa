import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BewersComponent } from './bewers.component';

describe('BewersComponent', () => {
  let component: BewersComponent;
  let fixture: ComponentFixture<BewersComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BewersComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BewersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
