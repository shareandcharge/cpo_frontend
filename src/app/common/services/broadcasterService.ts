import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Observable } from 'rxjs';
import { IBroadcastEvent } from '../interfaces';
import '../rxjs-operators';

@Injectable()
export class Broadcaster {
    private eventBus = new Subject<IBroadcastEvent>();

    broadcast(key: any, data?: any) {
        this.eventBus.next({key, data});
    }

    on<T>(key: any): Observable<T> {
        return this.eventBus.asObservable()
            .filter((event) => event.key === key)
            .map((event) => <T>event.data);
    }
}
