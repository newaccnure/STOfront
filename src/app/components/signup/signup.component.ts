import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignUpComponent implements OnInit {

  email: string = "";
  password: string = "";
  confirmPassword: string = "";
  role: string;
  
  constructor(
    private route: ActivatedRoute,
    private authService: AuthService) {
    this.route.queryParams.subscribe(params => {
      this.role = params.role
    });
  }

  ngOnInit() {
  }

  signup() {
    this.authService.signup(this.email, this.password, this.confirmPassword, this.role, "info").subscribe(
      data => {
        console.log(data)
      },
      error => console.log(error)
    )
  }

  loginForm() {

  }
}
