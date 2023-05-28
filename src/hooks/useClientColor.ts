import { useRouter } from 'next/router'
import { useState, useLayoutEffect } from 'react'

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

const getColor = () => colors[Math.floor(Math.random() * colors.length)]

export default () => {
  const router = useRouter()
  const [color, setColor] = useState(getColor)

  useLayoutEffect(() => {
    setColor(getColor)
  }, [router.asPath])

  return color
}
