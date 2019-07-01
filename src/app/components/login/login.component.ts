import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ProjectService } from 'src/app/Services/project.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  username;
  password;
  constructor(
    private projectService: ProjectService,
    private toast: ToastrService,
    private router: Router
  ) {}

  ngOnInit() {
    this.loginForm = new FormGroup({
      username: new FormControl('', [Validators.required]),
      password: new FormControl('', [Validators.required, Validators.min(6)])
    });
  }

  login() {
    this.username = this.loginForm.value.username;
    this.password = this.loginForm.value.password;

    console.log(this.username, this.password);

    this.projectService.login(this.username, this.password).subscribe(res => {
      this.handleLogin(res);
    });
  }

  handleLogin(res) {
    const status = res.status;
    if (status === 'success') {
      this.toast.success(res.msg, 'Success');
    } else if (status === 'failed') {
      this.toast.error(res.msg, 'Failed');
    } else {
      this.toast.error('Some error occured', 'Internal Server Error');
    }
  }

  navigateTo(where) {
    this.router.navigate(['/' + where]);
  }
}
