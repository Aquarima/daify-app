import {defaultGroup, Group} from "./group.model";
import {GroupRating} from "./group-rating.model";

export interface GroupRanking {
  group: Group;
  rank: number;
  rating: number;
  ratings: GroupRating[];
}

export function defaultGroupRanking(): GroupRanking {
  return {
    group: defaultGroup(),
    rank: 0,
    rating: 0,
    ratings: []
  };
}
