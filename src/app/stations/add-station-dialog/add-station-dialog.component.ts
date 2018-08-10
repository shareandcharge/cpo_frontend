import { Component, ComponentRef} from '@angular/core';
import { IModalDialog, IModalDialogOptions } from 'ngx-modal-dialog';
import { DataService, Broadcaster } from '../../common';
import { ToasterModule, ToasterService, ToasterContainerComponent } from 'angular2-toaster';

@Component({
  selector: 'app-modal-dialog',
  templateUrl: './add-station-dialog.component.html'
})
export class AddStationModalDialogComponent implements IModalDialog {

  parentInfo: string;
  actionButtons: any = [];
  modalInfo: any = [{
      "id": "Motionwerk-25",
      "type": "OTHER",
      "name": "Motionwerk-25",
      "address": "Rüttenscheider Str. 120",
      "city": "Essen",
      "postal_code": "45131",
      "country": "DE",
      "coordinates": {
        "latitude": "59.434012",
        "longitude": "2.00419"
      },
      "evses": [
        {
          "uid": "1",
          "evse_id": "BB-5958-01",
          "capabilities": [],
          "connectors": [
            {
              "id": "1",
              "standard": "IEC_62196_T2",
              "format": "CABLE",
              "power_type": "AC_3_PHASE",
              "voltage": 224,
              "amperage": 32,
              "tariff_id": "1"
            }
          ],
          "physical_reference": "1",
          "floor_level": "3"
        },
        {
          "uid": "2",
          "evse_id": "BB-5983-31",
          "capabilities": [],
          "connectors": [
            {
              "id": "1",
              "standard": "IEC_62196_T2",
              "format": "CABLE",
              "power_type": "AC_3_PHASE",
              "voltage": 224,
              "amperage": 32,
              "tariff_id": "1"
            }
          ],
          "physical_reference": "2",
          "floor_level": "3"
        }
      ],
      "operator": {
        "name": "Motionwerk GmbH"
      },
      "opening_times": {
        "regular_hours": [
          {
            "weekday": 1,
            "period_begin": "08:00",
            "period_end": "20:00"
          },
          {
            "weekday": 2,
            "period_begin": "08:00",
            "period_end": "20:00"
          },
          {
            "weekday": 3,
            "period_begin": "08:00",
            "period_end": "20:00"
          },
          {
            "weekday": 4,
            "period_begin": "08:00",
            "period_end": "20:00"
          },
          {
            "weekday": 5,
            "period_begin": "08:00",
            "period_end": "20:00"
          }
        ],
        "twentyfourseven": false,
        "exceptional_openings": [
          {
            "period_begin": "2014-06-21T09:00:00Z",
            "period_end": "2014-06-21T12:00:00Z"
          }
        ],
        "exceptional_closings": [
          {
            "period_begin": "2014-06-24T00:00:00Z",
            "period_end": "2014-06-25T00:00:00Z"
          }
        ]
      }
    }
  ];
  toasterService: any;

  constructor(private dataService: DataService,
    private broadcaster: Broadcaster,
    toasterService: ToasterService) {
    this.toasterService = toasterService;
    this.actionButtons = [
      {
        text: 'Cancel',
        buttonClass: 'sc-button modal-button modal-button-cancel',
        onAction: () => new Promise((resolve: any) => {
          setTimeout(() => {

            resolve();
          }, 20);
        })
      }, {
        text: 'Add',
        buttonClass: 'sc-button modal-button modal-button-success',
        onAction: () => new Promise((resolve: any) => {
          setTimeout(() => {
            this.addStation();
            resolve();
          }, 20);
        })
      }, {
        text: '',
        buttonClass: 'close',
        onAction: () => new Promise((resolve: any) => {
          setTimeout(() => {

            resolve();
          }, 20);
        })
      }
    ];
   }

  dialogInit(reference: ComponentRef<IModalDialog>, options: Partial<IModalDialogOptions<string>>) {
    this.parentInfo = options.data;
    this.modalInfo = JSON.stringify(this.modalInfo, null, 4);
  }

  addStation() {
    console.log(JSON.parse(this.modalInfo));
    this.modalInfo = JSON.parse(this.modalInfo);
    this.dataService.postStation(this.modalInfo).subscribe((data) => {
        console.log(data);
        this.broadcaster.broadcast('refreshStations', true);
        this.toasterService.pop('success', 'Success', 'You have successfuly added a new station.');
      });
  }


}


