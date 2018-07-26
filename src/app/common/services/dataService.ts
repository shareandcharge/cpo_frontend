import {Injectable} from '@angular/core';
import {Http, Response} from '@angular/http';
import {Observable} from 'rxjs/Observable';
import '../rxjs-operators';
import {ToasterModule, ToasterService, ToasterContainerComponent} from 'angular2-toaster';
import {Broadcaster} from './broadcasterService';
declare let BroadcastChannel;

@Injectable()
export class DataService {
    private cache = {};
    private errorObject: any = {};
    baseUrl = 'http://52.57.155.233:9090/api/v1/';

    constructor(private http: Http,
                private broadcaster: Broadcaster,
                private toasterService: ToasterService
              ) {
                this.toasterService = toasterService;
    }

    setCache(obj: any) {
        Object.assign(this.cache, obj);
    }

    getCache(prop: any) {
        return prop ? this.cache[prop] : this.cache;
    }

    /********************* AUTH0 ***************************/

    /********************* END AUTH0 ***********************/


    // CPO

    getAccountInfo(): Observable<any> {
      return this.execGETRequest(this.baseUrl + 'cpo');
    }

    setAccountInfo(params): Observable<any> {
        return this.execPOSTRequest(this.baseUrl + 'cpo');
    }

    getWalletSeed(): Observable<any> {
      return this.execGETRequest(this.baseUrl + 'cpo/wallet/seed');
    }

    getHistory(): Observable<any> {
      return this.execGETRequest(this.baseUrl + 'cpo/history');
    }

    generateWallet(): Observable<any> {
      return this.execPOSTRequest(this.baseUrl + 'cpo/wallet/generate');
    }


    /********************* Handling Requests ***********************/

    handleError(error: any, disabledToast?: boolean): Observable<Error> {
        const err = error || {};
        this.errorObject = JSON.parse(err._body);
        const errMessage = this.errorObject.error || 'Server error';
        if (!disabledToast) {
          this.toasterService.pop('error', 'Error', errMessage);
          this.logError(err).subscribe();
      }

        this.broadcaster.broadcast('httpRequest', false);
        return Observable.throw(errMessage);
    }

    private execPOSTRequest(url: string, params: Object = {}, disabledToast?: boolean): Observable<any> {
        this.broadcaster.broadcast('httpRequest', true);
        return this.http.post(url, params)
            .map((response: Response) => this.handleResponse(response))
            .catch((error: any) => this.handleError(error, disabledToast));
    }

    private execGETRequest(url: string, params: Object = {}): Observable<any> {
        this.broadcaster.broadcast('httpRequest', true);
        return this.http.get(url, {params})
            .map((response: Response) => this.handleResponse(response))
            .catch((error: any) => this.handleError(error));
    }

    handleResponse(response: Response) {
        let res: any = {};
        try {
            res = response.json();
        } catch (e) {

        }
        this.broadcaster.broadcast('httpRequest', false);

        if (res.status === 'ERROR') {
           // Handle errors thrown by back end
        }
        if (res.error) {
          // Handle errors thrown by back end
        }
        return res;
    }

    private logError(error: any): Observable<any> {
        return this.http.post('/log/js/message', {
            origin: 'CPO-web-app',
            userAgent: navigator ? navigator.userAgent : undefined,
            browser: navigator ? navigator.userAgent : undefined,
            url: window.location.href,
            cause: error.message,
            error: error.stack ? error.stack.toString() : JSON.stringify(error),
            date: new Date().getTime(),
            isError: true
        });
    }
}
