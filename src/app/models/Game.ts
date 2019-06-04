import { DateRange } from './DateRange';
import { User } from './User';
import { Score } from './Score';

export class Game {
    id: number
    gameSchedule: DateRange
    firstParticipant: User
    secondParticipant: User
    winner: User
    score: Score
    groupNumber: number
}