import {RatingCriteria} from "./rating-criteria.model";
import {Group} from "./group.model";
import {Member} from "./member.model";

export interface GroupRating {
  id: number;
  ratingCriteria: RatingCriteria;
  group: Group;
  rater: Member;
  rating: number;
}
