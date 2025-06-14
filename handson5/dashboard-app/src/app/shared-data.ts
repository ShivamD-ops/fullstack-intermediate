import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
@Injectable({
  providedIn: 'root',
})
export class SharedDataService {
  private currentMessage = new BehaviorSubject<string>(
    'Welcome to the Dashboard'
  );
  constructor() {}
  getMessage(): Observable<string> {
    return this.currentMessage.asObservable();
  }
  /**
   * Updates the message state.
   * This triggers all subscribers to receive the new message immediately.
   * @param newMessage The new message string to broadcast
   */
  updateMessage(newMessage: string): void {
    this.currentMessage.next(newMessage);
  }
}
