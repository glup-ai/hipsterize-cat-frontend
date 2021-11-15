import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { EMPTY, Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent{

  title = 'Hipsterize your cat';
  catFile: File | null = null;
  shadesFile: File | null = null;
  hipsterizedCat: any = null;
  hipsterizedCatImageSrc: SafeUrl | null;

  constructor(private http: HttpClient, private domSanitizer: DomSanitizer){
    this.hipsterizedCatImageSrc = null;
  }

  public hipsterizeCat(){
    if(this.catFile && this.shadesFile){
      this.getImage(this.shadesFile, this.catFile)
        .pipe(catchError((error: Error) => throwError(error)))
        .subscribe((response: ArrayBuffer) => {
          let array = new Uint8Array(response);
          let stringChar = array.reduce((data, byte) => {
            return data + String.fromCharCode(byte);
          }, '');
          let base64string = btoa(stringChar);
          this.hipsterizedCatImageSrc = this.domSanitizer.bypassSecurityTrustUrl(
            'data:image/jpg;base64, ' + base64string
          );
        }
      )
    }
  }

  public reset(){
    this.catFile = null; 
    this.shadesFile = null; 
    this.hipsterizedCat = null; 
    this.hipsterizedCatImageSrc = null;
  }

  public getImage(shadesFile: File, catFile: File): Observable<any> {
    var formData = new FormData();
    formData.append("shades", shadesFile, shadesFile.name);
    formData.append("cat", catFile, shadesFile.name);
    
    return this.http.post(
      "https://glup-fa.azurewebsites.net/api/gluphttptrigger",
      formData,
      { responseType: 'arraybuffer' }  // 'arraybuffer'|'blob'|'json'|'text'
    );
  }

}
