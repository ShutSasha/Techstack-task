import * as React from 'react'
import styles from './styles.module.scss'

interface WrapperProps {
   children: React.ReactNode
   style?: React.CSSProperties
}

export const Wrapper: React.FC<WrapperProps> = ({ children, style }) => {
   return (
      <div className={styles.wrapper} style={{ ...style }}>
         {children}
      </div>
   )
}
