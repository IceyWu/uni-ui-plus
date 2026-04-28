import { isPromise } from './util'

function noop() {}

export type Interceptor = (...args: any[]) => Promise<boolean> | boolean | undefined | void

export function callInterceptor(
  interceptor: Interceptor | undefined,
  {
    args = [],
    done,
    canceled,
    error
  }: {
    args?: unknown[]
    done: () => void
    canceled?: () => void
    error?: () => void
  }
) {
  if (interceptor) {
    const returnVal = interceptor(...args)

    if (isPromise(returnVal)) {
      returnVal
        .then((value) => {
          if (value) {
            done()
          } else if (canceled) {
            canceled()
          }
        })
        .catch(error || noop)
    } else if (returnVal) {
      done()
    } else if (canceled) {
      canceled()
    }
  } else {
    done()
  }
}

export function funInterceptor(
  interceptor: Interceptor | undefined,
  {
    args = [],
    done,
    canceled
  }: {
    args?: unknown[]
    done: (val?: any) => void
    canceled?: () => void
  }
) {
  if (interceptor) {
    const returnVal = interceptor(undefined, ...args)

    if (isPromise(returnVal)) {
      returnVal
        .then((value) => {
          if (value) done(value)
          else if (canceled) canceled()
        })
        .catch(() => {})
    } else if (returnVal) {
      done()
    } else if (canceled) {
      canceled()
    }
  } else {
    done()
  }
}
