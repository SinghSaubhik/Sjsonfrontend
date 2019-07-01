import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ProjectService } from 'src/app/Services/project.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {
  signupForm: FormGroup;

  constructor(
    private router: Router,
    private projectService: ProjectService,
    private toast: ToastrService
  ) {}

  ngOnInit() {
    this.signupForm = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email]),
      username: new FormControl('', [Validators.required]),
      password: new FormControl('', [Validators.required, Validators.min(6)]),
      password_again: new FormControl('', [Validators.required])
    });
  }

  signUp() {
    if (
      this.signupForm.value.password !== this.signupForm.value.password_again
    ) {
      this.toast.error('Password and retype-password does not match', 'Error');
      return;
    }

    this.projectService
      .signUp(
        this.signupForm.value.email,
        this.signupForm.value.username,
        this.signupForm.value.password
      )
      .subscribe(res => {
        this.handleSignUp(res);
      });
  }

  handleSignUp(res) {
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
