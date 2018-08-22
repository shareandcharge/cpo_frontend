import {Injectable} from '@angular/core';
import {Http, Response} from '@angular/http';
import {Observable} from 'rxjs';
import '../rxjs-operators';
import {ToasterModule, ToasterService, ToasterContainerComponent} from 'angular2-toaster';
import {Broadcaster} from './broadcasterService';
declare let BroadcastChannel;
import { environment } from '../../../environments/environment';
import { BlockUI, NgBlockUI } from 'ng-block-ui';

@Injectable()
export class DataService {
    private cache = {};
    private errorObject: any = {};
    @BlockUI() blockUI: NgBlockUI;
    baseUrl = environment.apiUrl;

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

    // CPO

    getAccountInfo(): Observable<any> {
      return this.execGETRequest(this.baseUrl + 'cpo');
    }

    setAccountInfo(params): Observable<any> {
        return this.execPOSTRequest(this.baseUrl + 'cpo', params);
    }

    getWallet(walletId): Observable<any> {
      return this.execGETRequest(this.baseUrl + 'wallet/' + walletId);
    }

    getWalletSeed(): Observable<any> {
      return this.execGETRequest(this.baseUrl + 'cpo/wallet/seed');
    }

    getHistory(walletId): Observable<any> {
      return this.execGETRequest(this.baseUrl + 'wallet/' + walletId + '/history/evcoin');
    }

    generateWallet(): Observable<any> {
      return this.execPOSTRequest(this.baseUrl + 'cpo/wallet/generate');
    }

    getStations(): Observable<any> {
      return this.execGETRequest(this.baseUrl + 'cpo/locations');
    }

    postStation(params): Observable<any> {
      return this.execPOSTRequest(this.baseUrl + 'cpo/location', params);
    }

    putStation(params, walletId): Observable<any> {
      return this.execPUTRequest(this.baseUrl + 'cpo/location/' + walletId, params);
    }

    deleteStation(scId): Observable<any> {
      return this.execDELETERequest(this.baseUrl + 'cpo/location/' + scId);
    }

    getPaymentWallet(): Observable<any> {
      return this.execGETRequest(this.baseUrl + 'cpo/payment/wallet');
    }

    getPaymentWalletHistory(token): Observable<any> {
      return this.execGETRequest(this.baseUrl + 'cpo/payment/cdr/' + token);
    }

    getPaymentWalletPending(): Observable<any> {
      return this.execGETRequest(this.baseUrl + 'cpo/payment/reimbursements/pending' );
    }

    getPaymentWalletComplete(): Observable<any> {
      return this.execGETRequest(this.baseUrl + 'cpo/payment/reimbursements/complete');
    }

    createReimbursement(mspAddress, tokenContract): Observable<any> {
      return this.execPOSTRequest(this.baseUrl + 'cpo/payment/reimbursement/' + mspAddress + '?tokenContract=' + tokenContract);
    }

    setPaymentWalletComplete(reimbursementId): Observable<any> {
      return this.execPUTRequest(this.baseUrl + 'cpo/payment/reimbursement/' + reimbursementId + '/complete');
    }

    getTariffs(): Observable<any> {
      return this.execGETRequest(this.baseUrl + 'cpo/tariffs' );
    }

    updateTarif(params): Observable<any> {
      return this.execPUTRequest(this.baseUrl + 'cpo/tariff', params);
    }

    newTariff(params): Observable<any> {
      return this.execPOSTRequest(this.baseUrl + 'cpo/tariff', params);
    }

    deleteariff(): Observable<any> {
      return this.execDELETERequest(this.baseUrl + 'cpo/tariffs');
    }

    sendTokensToMsp(reimbursementId): Observable<any> {
      return this.execPOSTRequest(this.baseUrl + 'cpo/payment/send_tokens_to_msp/' + reimbursementId);
    }

    /********************* Handling Requests ***********************/

    handleError(error: any, disabledToast?: boolean): Observable<Error> {
        const err = error || {};
        this.errorObject = JSON.parse(err._body);
        const errMessage = this.errorObject.error || 'Server error';
        setTimeout(() => {
          this.blockUI.stop();
        }, 100);
        if (!disabledToast) {
          this.toasterService.pop('error', 'Error', errMessage);
          this.logError(err).subscribe();
      }

        this.broadcaster.broadcast('httpRequest', false);
        return Observable.throw(errMessage);
    }

    private execPOSTRequest(url: string, params: Object = {}, disabledToast?: boolean): Observable<any> {
        this.broadcaster.broadcast('httpRequest', true);
        this.blockUI.start();
        return this.http.post(url, params)
            .map((response: Response) => this.handleResponse(response))
            .catch((error: any) => this.handleError(error, disabledToast));
    }

    private execGETRequest(url: string, params: Object = {}): Observable<any> {
        this.broadcaster.broadcast('httpRequest', true);
        this.blockUI.start();
        return this.http.get(url, {params})
            .map((response: Response) => this.handleResponse(response))
            .catch((error: any) => this.handleError(error));
    }

    private execPUTRequest(url: string, params: Object = {}): Observable<any> {
      this.broadcaster.broadcast('httpRequest', true);
      this.blockUI.start();
      return this.http.put(url, params)
          .map((response: Response) => this.handleResponse(response))
          .catch((error: any) => this.handleError(error));
    }

    private execDELETERequest(url: string, params: Object = {}): Observable<any> {
      this.broadcaster.broadcast('httpRequest', true);
      this.blockUI.start();
      return this.http.delete(url, {params})
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
        setTimeout(() => {
          this.blockUI.stop();
        }, 100);

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
