import { DateRange } from './DateRange';
import { Game } from './Game';

export class Schedule {
    breakTime: number
    gameDayEnd: number
    gameDayStart: number
    gameTime: number
    tournamentSchedule: DateRange
    games: Array<Game>
}