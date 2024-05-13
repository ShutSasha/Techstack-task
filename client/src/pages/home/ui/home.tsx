import { FC } from 'react'
import { Wrapper } from '../../../components'
import { ApartmentList } from '../../../components/apartment-list/ui/apartment-list'
import { ApartmentForm } from '../../../components/apartment-form'
import styles from './styles.module.scss'
import { ContentContainer } from '../../../components/content-container'

export const Home: FC = () => {
   return (
      <Wrapper style={{ justifyContent: 'center', alignItems: 'center', padding: '25px' }}>
         <ContentContainer style={{ maxWidth: '70vw', width: '100%' }}>
            <h1 className={styles.title}>Apartments Marketplace</h1>
            <ApartmentForm style={{ marginBottom: '25px' }} />
            <ApartmentList />
         </ContentContainer>
      </Wrapper>
   )
}
