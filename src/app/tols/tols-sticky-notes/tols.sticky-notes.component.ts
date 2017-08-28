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
    if (locStorStickyNotes && locStorStickyNotes  != '[]' ) {
      this.stickyList = JSON.parse(locStorStickyNotes);
    } else {
      this.showNewSticky = true;
    }
  }

  addStickyNote(): void {
    this.showNewSticky = true;
  };

  removeStickyNote(index: number): void {
    this.stickyList.splice(index, 1);
    localStorage.setItem('StickyNotes', JSON.stringify(this.stickyList));
  };
  cancelStickyNoteCreation() {
    this.stickyTitle = '';
    this.stickyBody = '';
    this.showNewSticky = false;
  }
  confirmAddStickyNote(): void {
    if (!this.stickyTitle || !this.stickyBody) {
      console.error('Ni el titulo ni el cuerpo pueden estar vacios');
      return;
    };
    let sticky = {} as StickyNotes;
    sticky.title = this.stickyTitle;
    sticky.body = this.stickyTitle;
    if (this.stickyList) {
      this.stickyList.unshift(sticky);
    } else {
      this.stickyList = [sticky];
    };
    localStorage.setItem('StickyNotes', JSON.stringify(this.stickyList));
    this.stickyTitle = '';
    this.stickyBody = '';
    this.showNewSticky = false;
  }
}
