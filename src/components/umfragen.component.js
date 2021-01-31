import React, { Fragment, useState } from 'react';
import UmfrageErstellen from './umfrage-erstellen.component';
import UmfragenVorstellen from './umfragen-vorstellen.component';

const Umfragen = () => {
    const [show, setShow] = useState(true);
    return (
        <Fragment>
            {show && <UmfrageErstellen setShow={setShow} />}
            {!show && <UmfragenVorstellen />}
        </Fragment>
    )
}

export default Umfragen;