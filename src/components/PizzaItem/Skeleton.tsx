import React, {FC} from 'react'
import ContentLoader from 'react-content-loader'

const Skeleton: FC = (props) => (
  <ContentLoader
    className='pizza-block'
    speed={2}
    width={280}
    height={465}
    viewBox='0 0 280 465'
    backgroundColor='#f3f3f3'
    foregroundColor='#ecebeb'
    {...props}
  >
    <circle
      cx='136'
      cy='136'
      r='120'
    />
    <rect
      x='10'
      y='275'
      rx='10'
      ry='10'
      width='261'
      height='25'
    />
    <rect
      x='10'
      y='319'
      rx='10'
      ry='10'
      width='260'
      height='80'
    />
    <rect
      x='11'
      y='424'
      rx='5'
      ry='5'
      width='80'
      height='25'
    />
    <rect
      x='116'
      y='413'
      rx='25'
      ry='25'
      width='150'
      height='45'
    />
  </ContentLoader>
)

export default Skeleton
