import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
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
    private router: Router,
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
        this.authService.saveToken(data)
        this.navigateToRoleHomePage()
      },
      error => console.log(error)
    )
  }

  navigateToRoleHomePage(){
    if (this.role == "organizer"){
      this.router.navigate(['tournament-manage']);
    } else if (this.role == "participant"){
      // this.router.navigate(['tournament-manage']);
      console.log("nothing")
    } else if (this.role == "representative"){
      // this.router.navigate(['tournament-manage']);
      console.log("nothing")
    }
  }
}
