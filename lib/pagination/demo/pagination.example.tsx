import React from 'react'
import Pagination from '../pagination'
const PaginationExample: React.FunctionComponent = () => {
    return (
        <Pagination defaultCurrent={1} total={20}/>
    )
}
export default PaginationExample