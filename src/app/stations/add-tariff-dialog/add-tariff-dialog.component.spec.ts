import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddTariffModalDialogComponent } from './add-tariff-dialog.component';

describe('ModalDialogComponent', () => {
  let component: AddTariffModalDialogComponent;
  let fixture: ComponentFixture<AddTariffModalDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddTariffModalDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddTariffModalDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
