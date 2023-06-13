export function println(text: string) {
  console.log(text)
}

export function printWarning(warning: string, reason?: Error) {
  console.warn(reason ? `${warning}: ${reason.message}` : warning)
}

export function printError(error: string, reason?: Error) {
  console.error(reason ? `${error}: ${reason.message}` : error)
  // console.error(reason)
}
