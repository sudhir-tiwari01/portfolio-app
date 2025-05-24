// src/app/loader/loader.component.ts

import { Component, Input } from "@angular/core";

@Component({
  selector: "app-loader",
  templateUrl: "./loader.component.html",
  styleUrls: ["./loader.component.css"],
})
export class LoaderComponent {
  /** When true, the spinner overlay is visible. */
  @Input() isVisible: boolean = false;
}
