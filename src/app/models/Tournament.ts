import { Schedule } from './Schedule';
import { EventFormat } from './EventFormat';
import { Sport } from './Sport';

export class Tournament{
    id: number
    name: string
    numberOfParticipants: number
    schedule: Schedule
    eventFormat: EventFormat
    sport: Sport 
}