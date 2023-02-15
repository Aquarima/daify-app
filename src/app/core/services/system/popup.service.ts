import {ComponentRef, Injectable, ViewContainerRef} from '@angular/core';
import {ConfirmBoxComponent} from "../../../shared/components/confirm-box/confirm-box.component";
import {Member} from "../../models/challenge/member.model";
import {MemberKickComponent} from "../../../features/challenge/components";
import {MemberBanishComponent} from "../../../features/challenge/components/member-banish/member-banish.component";

@Injectable({
  providedIn: 'root'
})
export class PopupService {

  viewContainerRef: ViewContainerRef | undefined;

  constructor() {
  }

  createConfirmModal(title: string, message: string, confirmCallBack: Function = () => {}, cancelCallback: Function = () => {}) {
    if (!this.viewContainerRef) return;
    const componentRef: ComponentRef<ConfirmBoxComponent> = this.viewContainerRef?.createComponent(ConfirmBoxComponent);
    const instance = componentRef.instance;
    instance.title = title;
    instance.message = message;
    instance.cancelEvent.subscribe(() => {
      cancelCallback();
      componentRef.destroy();
    });
    instance.confirmEvent.subscribe(() => {
      confirmCallBack();
      componentRef.destroy();
    });
    return componentRef;
  }

  createKickModal(target: Member, confirmCallBack: Function = () => {}, cancelCallback: Function = () => {})  {
    if (!this.viewContainerRef) return;
    const componentRef: ComponentRef<MemberKickComponent> = this.viewContainerRef.createComponent(MemberKickComponent);
    const instance = componentRef.instance;
    instance.member = target;
    instance.cancelEvent.subscribe(() => {
      cancelCallback();
      componentRef.destroy();
    });
    instance.confirmEvent.subscribe(() => {
      confirmCallBack();
      componentRef.destroy();
    });
    return componentRef;
  }

  createBanModal(target: Member, confirmCallBack: Function = () => {}, cancelCallback: Function = () => {}) {
    if (!this.viewContainerRef) return;
    const componentRef: ComponentRef<MemberBanishComponent> = this.viewContainerRef.createComponent(MemberBanishComponent);
    const instance = componentRef.instance;
    instance.member = target;
    instance.cancelEvent.subscribe(() => {
      cancelCallback();
      componentRef.destroy();
    });
    instance.confirmEvent.subscribe(() => {
      confirmCallBack();
      componentRef.destroy();
    });
    return componentRef;
  }
}
