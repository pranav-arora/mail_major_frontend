import {Injectable} from '@angular/core';

@Injectable()
export class AppUrl {

  constructor() {
  }
  static get BASE_URL(): string {
    return 'http://localhost:3000/';
  }
  static USER(): string {
      return this.BASE_URL + `user/profile`;
  }
  static MAILS(id?): string {
    if ( id) return this.BASE_URL + `user/${id}/mails`;
    else return this.BASE_URL + `user/mails`;
  }
  static LABELS(id?): string {
    if ( id) return this.BASE_URL + `user/${id}/labels`;
    else return this.BASE_URL + `user/labels`;
  }

  static LABEL(id?): string {
    if ( id) return this.BASE_URL + `user/label/${id}`;
    else return this.BASE_URL + `user/label`;
  }
  static QUERRY(): string {
    return this.BASE_URL + `user/mails/querry`;
  }
}
