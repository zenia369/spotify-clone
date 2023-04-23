const colors = [
  'red',
  'green',
  'blue',
  'orange',
  'yellow',
  'teal',
  'cyan',
  'purple',
  'pink',
]

export default () => {
  return colors[Math.floor(Math.random() * colors.length)]
}
