import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { ProjectService } from 'src/app/Services/project.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  @ViewChild('inputText') inputText;
  inputjson;
  url = '';

  constructor(private service: ProjectService, private toast: ToastrService) {}

  ngOnInit() {
    console.log(this.inputText.nativeElement.value);
  }

  generateApi() {
    let provideJson = {};
    try {
      provideJson = JSON.parse(this.inputjson);
    } catch (e) {
      this.toast.error('Please provide a valid json', 'Invalid json');
      return;
    }

    this.service.createAPI(provideJson).subscribe(res => {
      this.printUrl(res);
    });

    this.toast.success('Api successfuly created', 'Success');
  }

  printUrl(data) {
    this.url = data.url;
  }

  copyToClipboard(item) {
    document.addEventListener('copy', (e: ClipboardEvent) => {
      e.clipboardData.setData('text/plain', this.url);
      e.preventDefault();
      document.removeEventListener('copy', null);
    });
    document.execCommand('copy');
    this.toast.info('Link copied to clipboard', 'Copied');
  }
}
