import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddStationModalDialogComponent } from './add-station-dialog.component';

describe('ModalDialogComponent', () => {
  let component: AddStationModalDialogComponent;
  let fixture: ComponentFixture<AddStationModalDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddStationModalDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddStationModalDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
