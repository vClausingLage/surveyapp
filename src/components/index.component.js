import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';

const Index = () => {
    return (
        <Fragment>
            <div className="centered">
                <p>Erstellen Sie mit dieser App Ihre Umfrage und werten Sie sie aus.</p>
                <Link to={'/umfragen'}>Los geht's!</Link>
            </div>
        </Fragment>
    )
}

export default Index;