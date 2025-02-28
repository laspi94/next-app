import React from 'react'

export const Breadcrumb = () => {
    return (
        <ol className="breadcrumb float-sm-end">
            <li className="breadcrumb-item"><a href="#">Home</a></li>
            <li className="breadcrumb-item active" aria-current="page">Fixed Layout</li>
        </ol>
    )
}
