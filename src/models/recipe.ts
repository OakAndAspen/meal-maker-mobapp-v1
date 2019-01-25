import {User} from "./user";
import {Rating} from "./rating";

export class Recipe {
    _id: string;
    author: User;
    name: string;
    description: string;
    imageUrl: string;
    servings: Number;
    ratings: Rating[];
}
