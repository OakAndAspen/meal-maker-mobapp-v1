import {User} from "./user";
import {Recipe} from "./recipe";

export class Group {
    _id: string;
    name: string;
    members: User[];
    recipes: Recipe[];
}
