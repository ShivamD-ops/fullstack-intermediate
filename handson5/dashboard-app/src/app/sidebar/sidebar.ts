import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { SharedDataService } from '../shared-data';
@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './sidebar.html',
  styleUrls: ['./sidebar.css'],
})
export class SidebarComponent {
  newMessage: string = '';
  constructor(private sharedDataService: SharedDataService) {}
  updateSharedMessage(): void {
    if (this.newMessage.trim()) {
      this.sharedDataService.updateMessage(this.newMessage.trim());
      this.newMessage = '';
    }
  }
}
