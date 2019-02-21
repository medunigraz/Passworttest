import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders,HttpParams} from '@angular/common/http';


@Injectable()
export class ConfigService {
  constructor (private http: HttpClient) {

  }

  getPassWordCheck(password) {
    //let passWordCheckUrl = "https://api.medunigraz.at/v1/base/password-strength/";
    let passWordCheckUrl = "https://api-test.medunigraz.at/v1/base/password-strength/";
    let headers = new HttpHeaders().set("Content-Type", 'application/json');

/*
    let params = new HttpParams().set("password",password);
    console.log(params);
*/
    var parameter = JSON.stringify({"password": password});
    return this.http.post(passWordCheckUrl, parameter, {headers: {'Content-Type': 'application/json'} });    
  }
}
