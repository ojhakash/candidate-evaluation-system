export interface HashControlInterface{
    hash(password:string):string;
    compare(candidatePassword: string, hashedPassword: string):boolean;

}