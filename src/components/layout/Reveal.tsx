'use client'
import React, { useEffect, useRef } from 'react'
import { motion, useInView, useAnimation } from 'framer-motion'

interface Props {
  children: JSX.Element
  allowAnimation: boolean
  direction: 'left' | 'up' | 'right' | 'down' | 'none'
}

const Reveal = ({
  allowAnimation = false,
  children,
  direction = 'none',
}: Props): JSX.Element => {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true })
  const mainControls = useAnimation()

  useEffect(() => {
    if (isInView && allowAnimation) {
      switch (direction) {
        case 'left':
          mainControls.set('hiddenLeft')
          mainControls.start('visible')
          break
        case 'up':
          mainControls.set('hiddenUp')
          mainControls.start('visible')
          break
        case 'right':
          mainControls.set('hiddenRight')
          mainControls.start('visible')
          break
        case 'down':
          mainControls.set('hiddenDown')
          mainControls.start('visible')
          break
        default:
          mainControls.set('hidden')
          mainControls.start('visible')
      }
    }
  }, [allowAnimation, isInView, mainControls, direction])
  return (
    <div ref={ref} className="relative">
      <motion.div
        variants={{
          hidden: { opacity: 0, x: 0, y: 0 },
          hiddenLeft: { opacity: 0, x: 75, y: 0 },
          hiddenRight: { opacity: 0, x: -75, y: 0 },
          hiddenUp: { opacity: 0, x: 0, y: 75 },
          hiddenDown: { opacity: 0, x: 0, y: -75 },
          visible: { opacity: 1, x: 0, y: 0 },
        }}
        initial={allowAnimation ? 'hidden' : 'visible'}
        animate={mainControls}
        transition={{ duration: 0.5, delay: 0.5 }}
      >
        {children}
      </motion.div>
    </div>
  )
}

export default Reveal
