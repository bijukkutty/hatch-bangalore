import { Broadcaster } from './../services/broadcaster.service';
import { CommonService } from './../services/common.service';
import {
  Component,
  OnInit
} from '@angular/core';

import { AppState } from '../app.service';
import { Title } from './title';
// import { XLargeDirective } from './x-large';

@Component({
  // The selector is what angular internally uses
  // for `document.querySelectorAll(selector)` in our index.html
  // where, in this case, selector is the string 'home'
  selector: 'home',  // <home></home>
  // We need to tell Angular's Dependency Injection which providers are in our app.
  providers: [
    Title
  ],
  // Our list of styles in our component. We may add more to compose many styles together
  styleUrls: [ './home.component.css' ],
  // Every Angular template is first compiled by the browser before Angular runs it's compiler
  templateUrl: './home.component.html'
})
export class HomeComponent implements OnInit {

  // Set our default values
  public localState = { value: '' };
  // TypeScript public modifiers

  public events: any[] = [];
  public commUsers: any[] = [];

  public currentHeading: number = 0;

  // Number of header text in HTML
  private numberOfHeaders: number = 5;

  constructor(
    public appState: AppState,
    public title: Title,
    private commonService: CommonService,
    private broadcaster: Broadcaster
  ) {}

  public ngOnInit() {
    console.log('hello `Home` component');
    this.getUpComingEvents();
    this.getCommunity();

    setInterval(() => {
      this.currentHeading = (this.currentHeading + 1) % this.numberOfHeaders;
    }, 5000);
  }

  public getUpComingEvents() {
    this.commonService.getUpComingEvents()
      .then((data) => {
        this.events = data;
      });
  }

   public getCommunity() {
    this.commonService.getCommunity()
      .then((data) => {
        this.commUsers = data;
      });
  }

  public submitState(value: string) {
    console.log('submitState', value);
    this.appState.set('value', value);
    this.localState.value = '';
  }

  public openLogin() {
    this.broadcaster.broadcast('login_modal', {state: 'open', type: 'login'});
  }

  public openInvite() {
    this.broadcaster.broadcast('login_modal', {state: 'open', type: 'invite'});
  }
}
