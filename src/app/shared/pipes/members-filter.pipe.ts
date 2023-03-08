import { Pipe, PipeTransform } from '@angular/core';
import {defaultGroup, Group, Member} from "../../core";

@Pipe({
  name: 'membersFilter'
})
export class MembersFilterPipe implements PipeTransform {

  transform(members: Member[], filter: MemberFilterType, value: any): Member[] {
    if (filter === MemberFilterType.IS_SPECTATOR) {
      return members.filter((member) => member.spectator === value);
    }
    if (filter === MemberFilterType.HAS_GROUP) {
      return members.filter((member) => this.getGroupId(member.group) === value);
    }
    return members;
  }

  private getGroupId(group: Group): number {
    return group && group.id ? group.id : defaultGroup().id;
  }
}

export enum MemberFilterType {
  IS_SPECTATOR, HAS_GROUP
}
