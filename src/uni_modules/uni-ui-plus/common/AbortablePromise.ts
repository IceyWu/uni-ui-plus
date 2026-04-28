export class AbortablePromise<T> {
  promise: Promise<T>
  private _reject: ((res?: any) => void) | null = null

  constructor(executor: (resolve: (value: T | PromiseLike<T>) => void, reject: (reason?: any) => void) => void) {
    this.promise = new Promise<T>((resolve, reject) => {
      executor(resolve, reject)
      this._reject = reject
    })
  }

  abort(error?: any) {
    if (this._reject) {
      this._reject(error)
    }
  }

  then<TResult1 = T, TResult2 = never>(
    onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null,
    onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null
  ): Promise<TResult1 | TResult2> {
    return this.promise.then(onfulfilled, onrejected)
  }

  catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): Promise<T | TResult> {
    return this.promise.catch(onrejected)
  }
}
