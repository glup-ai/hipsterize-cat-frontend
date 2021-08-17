import { Component, ElementRef, EventEmitter, Output, ViewChild } from '@angular/core';

@Component({
  selector: 'app-drag-and-drop-file',
  templateUrl: './drag-and-drop-file.component.html',
  styleUrls: ['./drag-and-drop-file.component.scss']
})
export class DragAndDropFileComponent {
  @ViewChild("fileDropReference", { static: false }) fileDropEl: ElementRef | undefined;
  @Output() fileUploaded = new EventEmitter<any>();

  public uploadedImage: any = null; 

  // If dropping files
  onFileDropped(fileList: any) {
    let file = fileList.item(0);
    this.processUploadedFile(file);
  }

  // If 'Browse for file'
  fileBrowseHandler(event: any) {
    let file = event.target.files.item(0);
    this.processUploadedFile(file);
  }

  private processUploadedFile(file: File){
    if(this.isFileImage(file)){
      this.readImageToUrl(file)
      this.fileUploaded.emit(file);
    }
    else {
      alert('You need to upload an image file');
    }
  }

  private isFileImage(file: File): boolean {
    const fileType = file.type;
    if (fileType.match(/image\/*/) == null) {
      return false;
    }
    return true;
  }

  private readImageToUrl(file: File){
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = (_event) => {
      this.uploadedImage = reader.result;
    }
  }

}
