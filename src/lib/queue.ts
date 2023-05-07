interface Job {
  func: () => Promise<void>;
  resolve: (arg: any) => void;
  reject: (arg: any) => void;
}

export interface QueueOptions {
  // TODO: adds func type to json schema which is not supported
  //_queue?: Queue;
  concurrency?: number;
  timeout?: number; // TODO
}

export default class Queue {
  concurrency = 1;

  _running = 0;
  _queue: Array<Job> = [];

  constructor(opts: QueueOptions = {}) {
    if (opts.concurrency) this.concurrency = opts.concurrency;
  }

  runNext() {
    const job = this._queue.shift();
    if (!job) return;

    this._running++;
    job
      .func()
      .then((result: any) => job.resolve(result))
      .catch((error: any) => job.reject(error))
      .finally(() => {
        this._running--;
        this.checkQueue();
      });
  }

  checkQueue() {
    if (this._running < this.concurrency) this.runNext();
  }

  add(func: () => Promise<any>) {
    return new Promise((resolve, reject) => {
      this._queue.push({ func, resolve, reject });
      this.checkQueue();
    });
  }
}
