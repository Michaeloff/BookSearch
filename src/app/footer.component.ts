import { Component } from '@angular/core';

@Component({
  selector: 'app-footer',
  template: `
    <footer class="page-footer">
      <div class="footer-copyright">
          <div class="container">
              Developed by Dave Michaeloff
          </div>
      </div>
    </footer>
  `
})
export class FooterComponent {
  constructor() {}
}
