import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { SharedDataService } from '../shared-data';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './dashboard.html',
  styleUrls: ['./dashboard.css'],
})
export class DashboardComponent implements OnInit, OnDestroy {
  currentMessage: string = '';
  private messageSubscription!: Subscription;
  constructor(private sharedDataService: SharedDataService) {}
  ngOnInit(): void {
    this.messageSubscription = this.sharedDataService
      .getMessage()
      .subscribe((message) => {
        this.currentMessage = message;
      });
  }
  ngOnDestroy(): void {
    if (this.messageSubscription) {
      this.messageSubscription.unsubscribe();
    }
  }
}
