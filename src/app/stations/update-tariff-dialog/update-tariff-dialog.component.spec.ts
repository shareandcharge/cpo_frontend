import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateTariffModalDialogComponent } from './update-tariff-dialog.component';

describe('ModalDialogComponent', () => {
  let component: UpdateTariffModalDialogComponent;
  let fixture: ComponentFixture<UpdateTariffModalDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UpdateTariffModalDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UpdateTariffModalDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
