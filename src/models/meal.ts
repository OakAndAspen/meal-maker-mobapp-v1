import {User} from "./user";
import {Group} from "./group";
import {Recipe} from "./recipe";

export class Meal {
    _id: string;
    group: Group;
    participants: User[];
    recipe: Recipe;
    date: string;
    location: Object;
}
