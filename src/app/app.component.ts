import { Component } from '@angular/core';
import { HipsterizecatService } from './services/hipsterizecat.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'Hipsterize your cat';
  catFile: File | null = null;
  shadesFile: File | null = null;
  hipsterizedCat: File | null = null;

  constructor(private hipsterizeCatService: HipsterizecatService){}

  uploadShades(event: any) {
    if(event){
      this.shadesFile = event.target.files.item(0);
      console.log(this.shadesFile);
    }
  }

  uploadCat(event: any) {
    if(event){
      this.catFile = event.target.files.item(0);
      console.log(this.catFile);
    }
  }

  hipsterizeCat(){
    console.log('Click...')
    if(this.catFile && this.shadesFile){
      this.hipsterizeCatService.post(this.shadesFile, this.catFile).subscribe(
        result => {
          this.hipsterizedCat = result;
          console.log(this.hipsterizedCat);
        },
        error => {
          console.log(error);
        }
      )
    }
  }

}
