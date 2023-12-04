import Axios from 'axios';
import { useState, useEffect } from 'react';
import BarChart from './BarGraph';

export const LaCrimes = () => {
    const [crimes, setCrimes] = useState([]);

    useEffect(() => {
        const handleCrimes = async () => {
            try {
                const res = await Axios.get('http://localhost:4500/crimeInLosAngeles');
                const formattedData = Object.entries(res.data).map(([key, value]) => ({
                    name: key,
                    value: parseInt(value)
                }));
                setCrimes(formattedData);
            } catch (err) {
                console.log(err);
            }
        };

        handleCrimes();
    }, []);

    return (
        <div className="la-crimes">
            <h1>Crimes Committed In Los Angeles</h1>
            <BarChart data={crimes} />
        </div>
    );
};
