import type { ValidationOptions } from "./validateAndCoerceTypes";

interface QueueOptions {
  concurrency: number;
  timeout: number;
}

export interface Options {
  queue: QueueOptions;
  validation: ValidationOptions;
}

const options: Options = {
  queue: {
    // See https://github.com/sindresorhus/p-queue for all options
    concurrency: 4, // Min: 1, Max: Infinity
    timeout: 60,
  },
  validation: {
    logErrors: true,
    logOptionsErrors: true,
  },
};

export default options;
