import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';

const Index = () => {
    return (
        <Fragment>
            <div className="centered">
                <p>Erstellen Sie mit dieser App Ihre Umfrage und werten Sie sie aus.</p>
                <button style={{}}><Link to={'/umfrage/erstellen'} style={{textDecoration: 'none', color: 'white', fontSize: '1.5rem'}}>Los geht's!</Link></button>
            </div>
        </Fragment>
    )
}

export default Index;