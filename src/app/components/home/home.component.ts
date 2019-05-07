import { Component, OnInit } from '@angular/core';
import { NavigationExtras, Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit() {
    
  }

  signup(role: string){
    let navigationExtras: NavigationExtras = {
      queryParams: {
        role: role
      }
    }
    this.router.navigate(['signup'], navigationExtras);
    // console.log(role)
  }
}
