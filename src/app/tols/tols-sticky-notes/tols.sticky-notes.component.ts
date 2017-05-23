import { Component, Input } from '@angular/core';

interface StickyNotes {
  title: string,
  body: string,
};

@Component({
  selector: 'tols-sticky-notes',
  templateUrl: './tols.sticky-notes.view.html'
})
export class TolsStickyNotes {
  stickyList: Array<StickyNotes>
  showNewSticky: boolean;
  stickyTitle: string;
  stickyBody: string;
  constructor() {
    let locStorStickyNotes = localStorage.getItem('StickyNotes');
    if (locStorStickyNotes) {
      this.stickyList = JSON.parse(locStorStickyNotes);
    };
  }

  addStickyNote(): void {
    this.showNewSticky = true;
  };

  removeStickyNote(): void {

  };

  confirmAddStickyNote(): void {
    if (!this.stickyTitle || !this.stickyBody) {
      console.error('Error');
      return;
    };
    let sticky = {} as StickyNotes;
    sticky.title = this.stickyTitle;
    sticky.body = this.stickyTitle;
    if (this.stickyList) {
      this.stickyList.unshift()
    } else {
      this.stickyList = [sticky];
    };
    this.showNewSticky = false;
  }
}
