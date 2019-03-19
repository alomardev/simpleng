import {
  Component,
  Inject,
  Input,
  LOCALE_ID,
  OnDestroy,
  OnInit,
  TemplateRef,
  ViewChild,
  ViewContainerRef,
  ViewEncapsulation,
  HostListener,
  ElementRef,
  AfterViewInit,
  InjectionToken,
  Optional,
  HostBinding
} from '@angular/core';
import { Subscription } from 'rxjs';
import { SNGAlertValue, SNGAlertConfig, SNGDefaultConfigs } from '../simpleng.common';
import { SNGAlertService } from './alert.service';
import { style, trigger, transition, animate } from '@angular/animations';

export const SNG_DEFAULT_ALERT_CONFIG = new InjectionToken<SNGAlertConfig>('Default SimpleNG Alert configuration');

@Component({
  selector: 'sng-alert',
  templateUrl: './alert.component.html',
  styleUrls: ['./alert.component.scss'],
  encapsulation: ViewEncapsulation.None,
  animations: [
    trigger('showHide', [
      transition(':leave, visible => invisible', [
        animate('300ms ease-out', style({
          opacity: 0,
          height: 0,
          paddingTop: 0,
          paddingBottom: 0,
          marginTop: 0,
          marginBottom: 0
        })),
      ]),
      transition(':enter, invisible => visible', [
        style({
          height: 0,
          paddingTop: 0,
          paddingBottom: 0,
          marginTop: 0,
          marginBottom: 0
        }),
        animate('300ms ease-out', style({
          opacity: '*',
          height: '*',
          paddingTop: '*',
          paddingBottom: '*',
          marginTop: '*',
          marginBottom: '*'
        })),
      ]),
    ])
  ]
})
export class SNGAlertComponent implements OnInit, AfterViewInit, OnDestroy {

  @HostBinding('class.sng-alert') sngAlertClass = true;

  private _config: SNGAlertConfig;
  @Input('config')
  set config(val: SNGAlertConfig) {
    this._config = {
      ...SNGDefaultConfigs.alert,
      ...this.injectedConfig,
      ...val
    };
  }
  get config() {
    return this._config;
  }
  @Input() context: string;
  @Input() sticky = false;
  @Input() multi = false;

  @ViewChild('template') template: TemplateRef<any>;
  @ViewChild('inline', {read: ViewContainerRef}) inlineContainer: ViewContainerRef;
  @ViewChild('clone', {read: ViewContainerRef}) cloneContainer: ViewContainerRef;
  @ViewChild('original') originalElement: ElementRef;
  @ViewChild('sticky') stickyElement: ElementRef;

  messages: SNGAlertValue[] = [];
  sticked: boolean;
  cloneWidth: string;

  private marginTop = 0;
  private subscription: Subscription;

  constructor(@Inject(LOCALE_ID) private locale: string, private alertService: SNGAlertService,
              @Optional() @Inject(SNG_DEFAULT_ALERT_CONFIG) private injectedConfig: SNGAlertConfig) {
      this.config = this.injectedConfig;
  }

  ngOnInit() {
    this.subscription = this.alertService.emitter.subscribe((value: SNGAlertValue) => {
      if (!value.context && !name || value.context === this.context) {
        if (!value.type && !value.message) {
          this.clear();
        } else {
          if (!this.multi) {
            this.clear();
          }
          const message = this.resolve(value);
          this.render(message);
          if (value.timeout >= 0) {
            setTimeout(() => {
              this.clear(message);
            }, value.timeout);
          }
        }
      }
    });

  }

  ngAfterViewInit() {
    if (this.stickyElement) {
      this.marginTop = parseFloat(window.getComputedStyle(this.stickyElement.nativeElement as HTMLElement).marginTop);
    }
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  @HostListener('window:scroll')
  @HostListener('window:resize')
  measure() {
    this.sticked = (this.originalElement.nativeElement as HTMLElement).getBoundingClientRect().top <= this.marginTop;
    this.cloneWidth = `${(this.originalElement.nativeElement as HTMLElement).offsetWidth}px`;
  }

  clear(message?: SNGAlertValue) {
    if (message) {
      const index = this.messages.indexOf(message);
      if (index === -1) {
        return;
      }
      this.messages.splice(index, 1);
      this.inlineContainer.remove(index);
      if (this.cloneContainer) {
        this.cloneContainer.remove(index);
      }
    } else {
      this.messages.length = 0;
      this.inlineContainer.clear();
      if (this.cloneContainer) {
        this.cloneContainer.clear();
      }
    }
  }

  private render(message: SNGAlertValue) {
    this.messages.push(message);
    this.inlineContainer.createEmbeddedView(this.template, {$implicit: message});
    if (this.cloneContainer) {
      this.cloneContainer.createEmbeddedView(this.template, {$implicit: message});
    }
  }

  private resolve(value: SNGAlertValue): SNGAlertValue {
    const { message } = value;
    if (typeof message === 'string') {
      return value;
    }
    if (message.key) {
      // TOOD: Get from datasource
    } else if (message[this.locale]) {
      value.message = message[this.locale];
    }
    return value;
  }

}
