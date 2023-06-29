import { useRouter } from 'next/router'
import { useState, useLayoutEffect, useRef } from 'react'

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
  const colorRef = useRef<boolean>(false)

  if (typeof window === 'undefined') return
  useLayoutEffect(() => {
    if (colorRef.current) {
      setColor(getColor)
    }
    colorRef.current = true
  }, [router.asPath])

  return color
}
