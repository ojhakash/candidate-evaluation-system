import { RequestCustom } from "../types/RequestCustom";

export interface AuthControlInterface {
    sign(valueToEncode:string, secret:string):string;
    decode(token:string, secret:string):object;
    decodeRequestHeader(req: RequestCustom, secret: string):object;
}