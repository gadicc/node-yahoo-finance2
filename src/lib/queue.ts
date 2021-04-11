interface Job {
  func: Function;
  resolve: Function;
  reject: Function;
}

export default class Queue {
  concurrency: number = 1;

  _running: number = 0;
  _queue: Array<Job> = [];

  constructor() {}

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

  add(func: Function) {
    return new Promise((resolve, reject) => {
      this._queue.push({ func, resolve, reject });
      this.checkQueue();
    });
  }
}
