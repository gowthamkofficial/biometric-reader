import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, switchMap } from 'rxjs';
import * as xml2js from 'xml2js';
const mantraURL = "http://127.0.0.1:11100"
const morphoURL = 'http://127.0.0.1:11101'
const startekURL = 'http://localhost:11100'
// http://127.0.0.1 is local port 


@Injectable({
  providedIn: 'root'
})
export class BiometricService {

  constructor(private http: HttpClient) {
    // super(http);
  }



  getDeviceInformation(device: 'mantra' | 'morpho' | 'startek') { //getDeviceInfo ///rd/info
    let deviceInfo = device == 'mantra' ? "/rd/info" : device == 'startek' ? '/rd/info' : '/getDeviceInfo';
    let URL = device == 'mantra' ? mantraURL : device == 'startek' ? startekURL : morphoURL
    return this.http.request('DEVICEINFO', URL + deviceInfo, { responseType: "text" }).pipe(
      switchMap(async xml => await this.parseXmlToJson(xml))
    );

  }


  getDeviceStatus(device: 'mantra' | 'morpho' | 'startek'): Observable<any> {
    let URL = device == 'mantra' ? mantraURL : device == 'startek' ? startekURL : morphoURL
    return this.http.request('RDSERVICE', URL, { responseType: "text" }).pipe(
      switchMap(async xml => await this.parseXmlToJson(xml))
    );
  }

  captureFinger(device: 'mantra' | 'morpho' | 'startek', request: any): Observable<any> {
    let URL = device == 'mantra' ? mantraURL : device == 'startek' ? startekURL : morphoURL
    let params = `<?xml version="1.0"?> <PidOptions ver="${request?.pidOptVer}"> <Opts fCount="${request?.fCount}" fType="${request?.fType}" iCount="${request?.iCount}" pCount="${request?.pCount}" format="${request?.format}"   pidVer="${request?.pidVer}" timeout="${request?.timeout}" posh="${request?.posh}" env="${request?.env}" /> <CustOpts> <Param name="mantrakey" value="undefined" /> </CustOpts> </PidOptions>`
    return this.http.request('CAPTURE', URL + "/rd/capture", { body: params, responseType: "text" }).pipe(
      switchMap(async xml => await this.parseXmlToJson(xml))
    );
  }

  async parseXmlToJson(xml: any) {
    return await xml2js
      .parseStringPromise(xml, { explicitArray: false })
      .then(response => response);
  }
}
