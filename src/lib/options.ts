// TODO, keep defaults there too?
import type { ValidationOptions } from "./validateAndCoerceTypes";
import type { QueueOptions } from "./queue";

export interface PartialOptions {
  queue?: QueueOptions;
  validation?: ValidationOptions;
}

export type Options = Required<PartialOptions>;

const options: Options = {
  queue: {
    concurrency: 4, // Min: 1, Max: Infinity
    timeout: 60,
  },
  validation: {
    logErrors: true,
    logOptionsErrors: true,
  },
};

export default options;
