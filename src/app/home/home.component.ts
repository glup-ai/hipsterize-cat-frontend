import { Component } from '@angular/core';
import { HipsterizecatService } from '../services/hipsterizecat.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent{

  title = 'Hipsterize your cat';
  catFile: File | null = null;
  shadesFile: File | null = null;
  hipsterizedCat: File | null = null;

  constructor(private hipsterizeCatService: HipsterizecatService){}

  uploadShades(file: File) {
    this.shadesFile = file;
  }

  uploadCat(file: File) {
    this.catFile = file;
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
