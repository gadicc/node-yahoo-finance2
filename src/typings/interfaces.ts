import { QueueOptions } from "../lib/queue";
import { ValidationOptions } from "../lib/validateAndCoerceTypes";

export interface PartialOptions {
  queue?: QueueOptions;
  validation?: ValidationOptions;
}

export type Options = Required<PartialOptions>;
