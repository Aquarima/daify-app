import { Pipe, PipeTransform } from '@angular/core';
import {Member} from "../../core/models/challenge/member.model";

@Pipe({
  name: 'membersFilter'
})
export class MembersFilterPipe implements PipeTransform {

  transform(members: Member[], spectators: boolean): Member[] {
    return members.filter((member) => member.spectator === spectators);
  }
}
