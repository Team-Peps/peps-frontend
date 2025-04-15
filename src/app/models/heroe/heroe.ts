import {Game} from '../game';
import {HeroeRole} from './heroeRole';

export interface Heroe {
	id: string;
	name: string;
	role: HeroeRole;
	imageKey: string;
	game: Game;
}
