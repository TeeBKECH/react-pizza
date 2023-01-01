import React, {FC} from 'react'
import ReactPaginate from 'react-paginate'
import { useDispatch, useSelector } from 'react-redux'

import { setCurrentPage } from '../../store/slices/filterSlice'

import styles from './Pagination.module.scss'

const Pagination: FC = () => {
  const dispatch = useDispatch()
  const { curPage } = useSelector((store: any) => store.filter)

  return (
    <ReactPaginate
      className={styles.pagination}
      breakLabel='...'
      nextLabel='>'
      onPageChange={(e) => dispatch(setCurrentPage(e.selected + 1))}
      pageRangeDisplayed={4}
      forcePage={curPage - 1}
      pageCount={3}
      previousLabel='<'
      // renderOnZeroPageCount={null}
    />
  )
}

export default Pagination
