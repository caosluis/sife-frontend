import { Component, OnInit } from '@angular/core';
import * as about from "../../../assets/about"

export interface Section {
  name: string;
  updated: Date;
}

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.css']
})
export class AboutComponent implements OnInit {
  step = 0;

  setStep(index: number) {
    this.step = index;
  }

  nextStep() {
    this.step++;
  }

  prevStep() {
    this.step--;
  }

  abouts = about.abouts;

  constructor() { }

  ngOnInit(): void {
    console.log(this.abouts)
  }

}
