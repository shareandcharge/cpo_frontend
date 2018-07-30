import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';
import { Broadcaster, DataService } from '..';

@NgModule({
    imports: [HttpModule],
    providers: [Broadcaster, DataService],
    exports: [HttpModule]
})
export class ServicesModule {}
