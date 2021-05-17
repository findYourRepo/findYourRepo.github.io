import { Component, OnInit } from '@angular/core';
import { faHome } from '@fortawesome/free-solid-svg-icons';
import {
  faLinkedinIn,
  faStackOverflow,
  faGithub,
} from '@fortawesome/free-brands-svg-icons';

@Component({
  selector: 'app-head',
  templateUrl: './head.component.html',
  styleUrls: ['./head.component.css'],
})
export class HeadComponent implements OnInit {
  faHome = faHome;
  faLinkedin = faLinkedinIn;
  faStackOverflow = faStackOverflow;
  faGithub = faGithub;
  constructor() {}

  ngOnInit(): void {}
}
