import type ValidationOptions from "./validateAndCoerceTypes";

interface Options {
  validation: ValidationOptions;
}

const options: Options = {
  queue: {
    // See https://github.com/sindresorhus/p-queue for all options
    concurrency: 8, // Min: 1, Max: Infinity
    timeout: 60,
  },
  validation: {
    logErrors: true,
    logOptionsErrors: true,
  },
};

export default options;
