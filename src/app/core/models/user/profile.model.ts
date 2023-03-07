export interface Profile {
  id: number;
  firstName: string;
  lastName: string;
  username: string;
  avatarUrl: string;
  bannerUrl: string;
  country: string;
  languages: string[];
  birthdate: Date;
  online: boolean;
  socials: any;
  about: string;
  profession: string;
  lastTimeOnline: Date;
  createdAt: Date;
}

export function defaultProfile(): Profile {
  return {
    id: 0,
    firstName: 'Deleted User',
    lastName: 'Deleted User',
    username: 'Deleted User',
    avatarUrl: 'assets/avatar_placeholder.svg',
    bannerUrl: 'user_banner_placeholder.svg',
    country: '',
    languages: [],
    birthdate: new Date(),
    online: false,
    socials: {},
    about: '',
    profession: '',
    lastTimeOnline: new Date(),
    createdAt: new Date()
  } as Profile;
}

