import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  opened=true;

  constructor(
    private router: Router
  ) { }

  ngOnInit(): void {
  }

  openHome(){
    this.router.navigate(['/home']);
  }

  openTask(){
    this.router.navigate(['/task']);
  }
}
