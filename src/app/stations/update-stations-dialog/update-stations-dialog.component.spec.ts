import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateStationsModalDialogComponent } from './update-stations-dialog.component';

describe('ModalDialogComponent', () => {
  let component: UpdateStationsModalDialogComponent;
  let fixture: ComponentFixture<UpdateStationsModalDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UpdateStationsModalDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UpdateStationsModalDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
