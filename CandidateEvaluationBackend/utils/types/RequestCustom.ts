import { Request } from "express";

export interface RequestCustom extends Request {
  headers: { authorization: string; "x-forwarded-for"?: string };
}
