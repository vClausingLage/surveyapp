import React from 'react';

const UmfragenVorstellen = (data) => {
    const [umfragen, setUmfragen] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
        const response = await axios.get('http://localhost:4000/umfrage/list');
        setUmfragen(response.data);
        }
        fetchData();
    },[]);

    return (
        <Fragment>
        <h1>Ihre Umfragen</h1>
            <table>
            <tbody>
            {umfragen.map(umfrage => (
                    <tr key={umfragen.indexOf(umfrage)}><td><Link to={'/umfrage/list/' + umfrage._id}>{umfrage.name}</Link></td></tr>
            ))}
            </tbody>
            </table>
        </Fragment>
    )
}

export default UmfragenVorstellen;