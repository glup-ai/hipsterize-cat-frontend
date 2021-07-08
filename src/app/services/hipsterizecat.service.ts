import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ITS_JUST_ANGULAR } from '@angular/core/src/r3_symbols';

@Injectable({
  providedIn: 'root'
})
export class HipsterizecatService {

  postUrl = "https://glup-ai-fa.azurewebsites.net/api/GlupHipsterCatHttpTrigger";
  options = { headers: new HttpHeaders().set('Content-Type', 'multipart/form-data') };

  constructor(private http: HttpClient) { }

  public post(shadesFile: File, catFile: File): Observable<File> {
    console.log(typeof shadesFile);
    var formData = new FormData();
    formData.append('shades', shadesFile, shadesFile.name);
    formData.append('cat', catFile, shadesFile.name);
    
    console.log('Sending post ...');

    // TODO: Fix failing post method
    return this.http.post<File>(
      this.postUrl,
      formData,
      {
        headers: {'Content-Type' : 'multipart/form-data'}
      });
  }
}
