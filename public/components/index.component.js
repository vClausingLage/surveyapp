import React from 'react';

const Index = () => {

    const date = new Date().toLocaleDateString();
    return (
        <div className='w3-container'>
            <h1 className=''>Startseite</h1>
            <p>am {date}</p>
        </div>
    )
}

export default Index;