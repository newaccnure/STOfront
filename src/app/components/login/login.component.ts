import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  email: string = "";
  password: string = "";
  role:string;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private authService: AuthService) {
    this.role = this.route.snapshot.paramMap.get('role');
    console.log(this.role)
  }

  ngOnInit() {
  }

  login(){
    this.authService.login(this.email, this.password).subscribe(
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
