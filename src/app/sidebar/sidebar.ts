import { AfterViewInit, Component } from '@angular/core';
import Scrollbar from 'smooth-scrollbar';

@Component({
  selector: 'app-sidebar',
  imports: [],
  templateUrl: './sidebar.html',
  styleUrl: './sidebar.scss'
})
export class Sidebar implements AfterViewInit {

  ngAfterViewInit(): void {
      const isWindows = navigator.userAgent.includes('Windows');
      const el = document.querySelector('#sidenav-scrollbar');
      if (isWindows && el instanceof HTMLElement) {
        Scrollbar.init(el, { damping: 0.5 });
      }
    }

}
