//Code reference https://www.youtube.com/watch?v=IYCa1F-OWmk

import React from 'react'

/**
 * 
 * @param {*} entriesPerPage
 * @param {*} totalEntries
 * @param {*} paginate
 * @returns Pagination component
 */
const Pagination = ({ entriesPerPage, totalEntries, paginate }) => {
  const pageNumbers = []

  for (let i = 1; i <= Math.ceil(totalEntries / entriesPerPage); i++) {
    pageNumbers.push(i)
  }
  return (
    <nav className="pages">
      <ul className="pagination">
        {pageNumbers.map((number) => (
          <li key={number} className="page-item">
            <a onClick={() => paginate(number)} className="page-link">
              {number}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  )
}

export default Pagination
