export const logger = {
  log(msg: string | Error) {
    console.log(msg)
  },

  warn(msg: string | Error) {
    console.warn(msg)
  },

  error(msg: string | Error) {
    console.error(msg)
  },
}
