// src/app/app.component.ts

import { Component, OnDestroy, OnInit } from "@angular/core";
import { Router, NavigationStart, NavigationEnd, NavigationCancel, NavigationError, Event } from "@angular/router";
import { Subscription } from "rxjs";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"],
})
export class AppComponent implements OnInit, OnDestroy {
  isLoading: boolean = false;
  private routerSubscription!: Subscription;

  constructor(private router: Router) {}

  ngOnInit(): void {
    // Subscribe to router events
    this.routerSubscription = this.router.events.subscribe((event: Event) => {
      if (event instanceof NavigationStart) {
        this.isLoading = true;
      } else if (
        event instanceof NavigationEnd ||
        event instanceof NavigationCancel ||
        event instanceof NavigationError
      ) {
        this.isLoading = false;
      }
    });
  }

  ngOnDestroy(): void {
    // Prevent memory leaks
    if (this.routerSubscription) {
      this.routerSubscription.unsubscribe();
    }
  }
}
