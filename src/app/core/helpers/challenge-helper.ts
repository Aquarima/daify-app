import {Challenge, defaultChallenge, User} from "../models";

export class ChallengeHelper {

  private loggedUser: User;
  private challenge: Challenge;

  constructor(loggedUser: User, src: Challenge) {
    this.loggedUser = loggedUser;
    this.challenge = src;
  }

  isLoggedUserMember(): boolean {
    return !!this.challenge.members.find((member) => member.profile.id === this.loggedUser.id);
  }

  isLoggedUserAuthor(): boolean {
    return this.loggedUser.id === this.challenge.author.id;
  }

  getIconUrl(): string {
    return this.challenge.iconUrl || defaultChallenge().iconUrl;
  }

  getCoverUrl(): string {
    return this.challenge.iconUrl || defaultChallenge().coverUrl;
  }
}
