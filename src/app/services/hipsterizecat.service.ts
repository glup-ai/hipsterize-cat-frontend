import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ITS_JUST_ANGULAR } from '@angular/core/src/r3_symbols';

@Injectable({
  providedIn: 'root'
})
export class HipsterizecatService {

  postUrl = "https://glup-ai-fa.azurewebsites.net/api/GlupHipsterCatHttpTrigger";
  postLocalUrl = "http://localhost:7071/api/GlupCatHipsterizer";
  options = { headers: new HttpHeaders().set('Content-Type', 'multipart/form-data') };

  constructor(private http: HttpClient) { }

  public post(shadesFile: File, catFile: File): Observable<File> {
    
    var formData = new FormData();
    formData.set('shades', shadesFile as File, shadesFile.name);
    formData.set('cat', catFile as File, shadesFile.name);

    var options = new Headers();
    options.append('Content-Type', 'multipart/form-data');
    
    console.log('Sending post ...');

    // TODO: Fix failing post method
    return this.http.post<File>(
      this.postLocalUrl,
      formData,
      {
        headers: {'Content-Type' : 'multipart/form-data'}
      });
  }
}
