import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { DeleteStationsModalDialogComponent } from './delete-stations-dialog.component';

describe('ModalDialogComponent', () => {
  let component: DeleteStationsModalDialogComponent;
  let fixture: ComponentFixture<DeleteStationsModalDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DeleteStationsModalDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DeleteStationsModalDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
