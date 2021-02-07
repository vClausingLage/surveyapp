import React, { Fragment } from 'react';
import { useParams, Link } from 'react-router-dom';
 
const FireUmfrage = (  ) => {
    let { id } = useParams();
    return (
        <Fragment>
            <Link to={`/umfragen/fire/${id}`}>{id}</Link>
        {id}
        </Fragment>
    )
}

export default FireUmfrage;