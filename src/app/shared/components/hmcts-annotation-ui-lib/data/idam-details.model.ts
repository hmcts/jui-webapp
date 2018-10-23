export interface IIdamDetails {
    forename?: string;
    surname?: string;
    email?: string;
}

export class IdamDetails implements IIdamDetails {
    constructor(
        public forename: string,
        public surname: string,
        public email: string
    ) {}
}
