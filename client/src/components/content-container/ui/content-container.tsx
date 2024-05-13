import { CSSProperties, FC, ReactNode } from 'react'

interface ContentContainerProps {
   children: ReactNode
   style?: CSSProperties
}

export const ContentContainer: FC<ContentContainerProps> = ({ children, style }) => {
   return <div style={{ ...style }}>{children}</div>
}
