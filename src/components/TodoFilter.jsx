import React from 'react'


export default function TodoFilter({ searchTerm, setSearchTerm, filter, setFilter }) {
    // old handleSearch + handleFilter combined into one re-render
    function handleSearch(e) {
        setSearchTerm(e.target.value.toLowerCase())
    }
    function handleFilterChange(e) {
        setFilter(e.target.value)
    }

    // same HTML as vanilla <input id="searchInput"> + <select id="filterSelect">
    return (
        <div className="header-controls">
            <input
                type="text"
                className="search-input"
                placeholder="Search tasks..."
                value={searchTerm}
                onChange={handleSearch}
            />
            <select className="filter-select" value={filter} onChange={handleFilterChange}>
                <option value="all">All</option>
                <option value="pending">Pending</option>
                <option value="completed">Completed</option>
                <option value="overdue">Overdue</option>
            </select>
        </div>
    )
}