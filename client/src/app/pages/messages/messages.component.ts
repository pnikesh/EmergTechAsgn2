import { Router } from '@angular/router';
import { FlashMessagesService } from 'angular2-flash-messages';
import { MessageService } from './../../services/message.service';
import { Message } from './../../models/message';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-messages',
  templateUrl: './messages.component.html',
  styleUrls: ['./messages.component.css']
})
export class MessagesComponent implements OnInit {


  messages: Message[];

  constructor(
    private messageService: MessageService,
    private flashMessage: FlashMessagesService,
    private router: Router
  ) { }

  ngOnInit() {
    this.messages = new Array<Message>();

    this.displayMessageList();
  }

  private onDeleteClick(): void {
    if (!confirm('Are You Sure?')) {
      this.router.navigate(['/message']);
    }
  }

  // displaying visitors messages

  displayMessageList(): void {
    this.messageService.getList().subscribe(data => {
      if(data.success) {
        this.messages = data.messageList;
      } else {
        this.flashMessage.show('User must be logged-in', {cssClass: 'alert-danger', timeOut: 3000});
      }
    });
  }
}

