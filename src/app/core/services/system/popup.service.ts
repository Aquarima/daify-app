import {ComponentRef, Injectable, ViewContainerRef} from '@angular/core';
import {ConfirmBoxComponent} from "../../../shared";
import {Banishment, Challenge, Member, RatingCriteria,} from "../../models";
import {
  BanishmentViewComponent,
  MemberBanishComponent,
  MemberKickComponent, RatingCriteriaCreateComponent
} from "../../../features/challenge/components";

@Injectable({
  providedIn: 'root'
})
export class PopupService {

  private viewContainerRef: ViewContainerRef | undefined;

  constructor() {
  }

  setViewContainerRef(viewContainerRef: ViewContainerRef) {
    this.viewContainerRef = viewContainerRef;
  }

  createConfirmModal(title: string, message: string, confirmCallBack: Function = () => {}, cancelCallback: Function = () => {}) {
    if (!this.viewContainerRef) return;
    const componentRef: ComponentRef<ConfirmBoxComponent> = this.viewContainerRef.createComponent(ConfirmBoxComponent);
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

  createKickModal(target: Member, confirmCallBack: Function = () => {}, cancelCallback: Function = () => {}) {
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

  createBanModal(target: Member, confirmCallBack: Function = (reason: string, blacklist: boolean) => {}, cancelCallback: Function = () => {}) {
    if (!this.viewContainerRef) return;
    const componentRef: ComponentRef<MemberBanishComponent> = this.viewContainerRef.createComponent(MemberBanishComponent);
    const instance = componentRef.instance;
    instance.member = target;
    instance.cancelEvent.subscribe(() => {
      cancelCallback();
      componentRef.destroy();
    });
    instance.confirmEvent.subscribe(({reason, blacklist}) => {
      confirmCallBack(reason, blacklist);
      componentRef.destroy();
    });
    return;
  }

  createBanishmentViewModal(challenge: Challenge, banishment: Banishment, cancelCallback: Function = () => {}) {
    if (!this.viewContainerRef) return;
    const componentRef: ComponentRef<BanishmentViewComponent> = this.viewContainerRef.createComponent(BanishmentViewComponent);
    const instance = componentRef.instance;
    instance.banishment = banishment;
    instance.challenge = challenge;
    instance.cancelEvent.subscribe(() => {
      cancelCallback();
      componentRef.destroy();
    });
    return;
  }

  createRatingCriteriaCreateModal(confirmCallBack: Function = (ratingCriteria: RatingCriteria) => {}, cancelCallback: Function = () => {}) {
    if (!this.viewContainerRef) return;
    const componentRef: ComponentRef<RatingCriteriaCreateComponent> = this.viewContainerRef.createComponent(RatingCriteriaCreateComponent);
    const instance = componentRef.instance;
    instance.closeEvent.subscribe(() => {
      cancelCallback();
      componentRef.destroy();
    });
    instance.confirmEvent.subscribe((ratingCriteria) => {
      confirmCallBack(ratingCriteria);
      componentRef.destroy();
    });
    return;
  }
}
