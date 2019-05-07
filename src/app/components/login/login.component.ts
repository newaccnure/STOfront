import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  role:string;

  constructor(
    private route: ActivatedRoute,
    private authService: AuthService) {
    this.role = this.route.snapshot.paramMap.get('role');
    console.log(this.role)
  }

  ngOnInit() {
  }
  login(){
    
  }
}
