import { Pipe, PipeTransform } from '@angular/core';
import {Member} from "../../core";

@Pipe({
  name: 'membersFilter'
})
export class MembersFilterPipe implements PipeTransform {

  transform(members: Member[], filter: MemberFilterType, value: any): Member[] {
    if (filter === MemberFilterType.IS_SPECTATOR) {
      return members.filter((member) => member.spectator === value);
    }
    if (filter === MemberFilterType.HAS_GROUP) {
      return members.filter((member) => member.group.id === value);
    }
    return members;
  }
}

export enum MemberFilterType {
  IS_SPECTATOR, HAS_GROUP
}
