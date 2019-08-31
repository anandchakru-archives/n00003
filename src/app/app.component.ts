import { Component, Renderer2, OnInit } from '@angular/core';
import { ClogService } from '@nivite/nlib';
import { InvitePhoto, Invite, Guest } from '@nivite/nlib/lib/util/nlib-model';

@Component({
  selector: 'nivite-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  loading = true;
  guest: Guest;
  invite: Invite;
  photo: InvitePhoto;
  constructor(private clog: ClogService, private rendrer: Renderer2) { }
  ngOnInit() {
    setTimeout(() => this.loading = false, 1000);
  }
  loadInviteData(invite: any) {
    this.invite = invite;
    this.clog.log('invite: ' + (invite ? invite.hostName : invite));
    if (invite && invite.photos && invite.photos.length) {
      invite.photos.forEach(photo => {
        if (photo.tags && photo.tags.length) {
          photo.tags.forEach((tag: string) => {
            if (tag && ('bg' === tag.toLowerCase() || 'background' === tag.toLowerCase())) {
              this.photo = photo;
              return;
            }
          });
        }
      });
    }
  }
  loadUserData(user: any) {
    this.clog.log('user: ' + (user ? user.email : user));
  }
  loadGuestData(guest: any) {
    this.guest = guest;
    this.clog.log('guest: ' + (guest ? guest.email : guest));
  }
}
