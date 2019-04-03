import { MessageService } from './../services/message.service';

import { Component, OnInit } from '@angular/core';
import { FlashMessagesService } from 'angular2-flash-messages';
import { Router, ActivatedRoute } from '@angular/router';

import { Message } from 'src/app/models/message';

@Component({
  selector: 'app-message-delete',
  templateUrl: './message-delete.component.html',
  styleUrls: ['./message-delete.component.css']
})

export class MessageDeleteComponent implements OnInit {
  title: string;
  message: Message;

  constructor(
    private activatedRoute: ActivatedRoute,
    private flashMessage: FlashMessagesService,
    private messageService: MessageService,
    private router: Router
  ) { }

  ngOnInit() {
    this.title = this.activatedRoute.snapshot.data.title;
    this.message = new Message();

    this.activatedRoute.params.subscribe(params => {
      this.message._id = params.id;
    });

    this.deleteMessage(this.message);
  }

  // Deletning a message
  private deleteMessage(message: Message): void {
    this.messageService.deleteMessage(message).subscribe(data => {
      if (data.success) {
        this.flashMessage.show(data.msg, {cssClass: 'alert-warning', timeOut: 3000});
        this.router.navigate(['/message']);
      } else {
        this.flashMessage.show('Delete Contact Failed', {cssClass: 'alert-danger', timeOut: 3000});
        this.router.navigate(['/message']);
      }
    });
  }

}
