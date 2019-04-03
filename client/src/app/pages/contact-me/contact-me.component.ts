import { FlashMessagesService } from 'angular2-flash-messages';
import { AuthService } from './../../services/auth.service';
import { Message } from './../../models/message';
import { MessageService } from './../../services/message.service';
import { Component, OnInit } from '@angular/core';
import { BasePageComponent } from 'src/app/partials/base-page/base-page.component';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-contact',
  templateUrl: './contact-me.component.html',
  styleUrls: ['./contact-me.component.css']
})
export class ContactMeComponent extends BasePageComponent implements OnInit {
  message: Message;

  constructor(
    route: ActivatedRoute,
    private messageService: MessageService,
    private flashMessage: FlashMessagesService,
    private authService: AuthService,
    private router: Router
    ) {
    super(route);
  }

  ngOnInit() {
    this.message = new Message();
  }

  // checing for user loggedin
  isLoggedIn(): boolean {
    return this.authService.loggedIn();
  }

  // submit a message
  onMessageSubmit(): void{
    this.messageService.addMessage(this.message).subscribe(data => {
      if (data.success) {
        this.flashMessage.show(data.msg, {cssClass: 'alert-success', timeOut: 3000});
        this.router.navigate(['/home']);
      } else {
        this.flashMessage.show(data.msg, {cssClass: 'alert-danger', timeOut: 3000});
        this.router.navigate(['/home']);
      }
     });
  }

}
