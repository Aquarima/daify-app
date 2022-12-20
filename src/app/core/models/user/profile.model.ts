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
