import React from 'react'

function Pager({ page, setPage, numberOfResults }) {
    return (
        <>
            < nav aria-label="Page navigation example" >
                <ul className="pagination">
                    <li className={`page-item ${page === 1 ? "disabled" : ""}`}>
                        <a className="page-link" href="#!" onClick={(e) => {
                            e.preventDefault(); if (page > 1) { setPage(page - 1); }
                        }}>
                            Previous
                        </a>
                    </li>

                    <li className={`page-item ${numberOfResults < 10 ? "disabled" : ""}`}>
                        <a className="page-link" href="#!" onClick={(e) => { e.preventDefault(); setPage(page + 1); }}>
                            Next
                        </a>
                    </li>
                </ul>
            </nav >
        </>
    )
}

export default Pager


