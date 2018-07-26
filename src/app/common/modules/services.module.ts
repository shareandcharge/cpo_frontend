import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';
import { Broadcaster, DataService } from '../index';

@NgModule({
    imports: [HttpModule],
    providers: [Broadcaster, DataService],
    exports: [HttpModule]
})
export class ServicesModule {}
