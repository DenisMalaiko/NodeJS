import { RequestHandler } from "../types/RequestHandler";

export interface RouterMap {
  [key: string]: RequestHandler;
}