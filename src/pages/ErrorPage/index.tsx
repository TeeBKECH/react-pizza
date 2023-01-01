import React, {FC} from 'react'
import { useRouteError } from 'react-router-dom'

import Header from '../../components/Header'

import styles from './ErrorPage.module.scss'

const ErrorPage: FC = () => {
  const error: any = useRouteError()
  console.error(error)

  return (
    <div className='wrapper'>
      <Header />

      <div className='content'>
        <div className='container'>
          <div className={styles.error_page}>
            <h1>Oops!</h1>
            <p>Sorry, an unexpected error has occurred.</p>
            <p>
              <i>{error.statusText || error.message}</i>
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ErrorPage
