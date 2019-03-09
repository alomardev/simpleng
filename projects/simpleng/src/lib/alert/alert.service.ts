import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { SNGAlertValue, SNGAlertMessage, SNGAlertType } from '../simpleng.common';

@Injectable()
export class SNGAlertService {

  emitter = new Subject<SNGAlertValue>();

  success(message: SNGAlertMessage, context?: string, timeout?: number) {
    this.emit('success', message, context, timeout);
  }

  warning(message: SNGAlertMessage, context?: string, timeout?: number) {
    this.emit('warning', message, context, timeout);
  }

  error(message: SNGAlertMessage, context?: string, timeout?: number) {
    this.emit('error', message, context, timeout);
  }

  info(message: SNGAlertMessage, context?: string, timeout?: number) {
    this.emit('info', message, context, timeout);
  }

  clear(context?: string) {
    this.emit(null, null, context);
  }

  private emit(type: SNGAlertType, message: SNGAlertMessage, context?: string, timeout?: number) {
    this.emitter.next({type, message, context, timeout});
  }

}
