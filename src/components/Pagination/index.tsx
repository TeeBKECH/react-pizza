import React, {FC} from 'react'
import ReactPaginate from 'react-paginate'
import { useSelector } from 'react-redux'

import { setCurrentPage } from '../../store/slices/filterSlice'
import { RootState, useAppDispatch } from '../../store/store'

import styles from './Pagination.module.scss'

const Pagination: FC = () => {
  const dispatch = useAppDispatch()
  const { curPage } = useSelector((store: RootState) => store.filter)

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
    />
  )
}

export default Pagination
