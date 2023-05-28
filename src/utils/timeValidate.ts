export function getMinuts(time: number) {
  const minutes = Math.floor(time / 60)

  const seconds = time % 60

  const validateTime = (checkTime: number) => String(checkTime).padStart(2, '0')

  return `${validateTime(minutes)}:${validateTime(seconds)}`
}
