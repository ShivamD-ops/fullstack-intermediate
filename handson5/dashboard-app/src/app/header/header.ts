import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { SharedDataService } from '../shared-data';
@Component({
  selector: 'app-header',
  templateUrl: './header.html',
  styleUrls: ['./header.css']
})
export class HeaderComponent implements OnInit, OnDestroy {
  // Holds the current message from the shared service
  currentMessage: string = '';
  // Store the subscription so we can unsubscribe to prevent memory leaks
  private messageSubscription!: Subscription;
  // Inject the shared data service to access the observable
  constructor(private sharedDataService: SharedDataService) { }
  /**
  * Subscribe to the shared message observable when the component
  initializes.
  * Every emission updates the currentMessage displayed in the header.
  */
  ngOnInit(): void {
    this.messageSubscription =
      this.sharedDataService.getMessage().subscribe(message => {
        this.currentMessage = message;
      });
  }
  /**
  * Unsubscribe from the observable when the component is destroyed
  * to avoid memory leaks, following Angular best practices.
  */
  ngOnDestroy(): void {
    if (this.messageSubscription) {
      this.messageSubscription.unsubscribe();
    }
  }
}