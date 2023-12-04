import { useState, useEffect } from 'react';
import Axios from 'axios';
import HeatMap from './HeatMap';
import BarChart from './BarGraph';

export const NewYorkCrimes = () => {
    const [counties, setCounties] = useState([]);
    const [selectedView, setSelectedView] = useState('both'); 

    const fetchCounties = async () => {
        try {
            const response = await Axios.get('http://localhost:4500/newYorkCrimes');
            const formattedData = Object.entries(response.data).map(([key, value]) => ({
                name: key,
                value: parseInt(value)
            }));
            setCounties(formattedData);
        } catch (err) {
            console.log(err);
        }
    };

    useEffect(() => {
        fetchCounties();
    }, []);

    // Inline CSS for dropdown
    const dropdownStyle = {
        padding: '10px',
        margin: '10px 0',
        fontSize: '16px',
        border: '2px solid #ddd',
        borderRadius: '5px',
        cursor: 'pointer'
    };

    return (
        <div className="new-york-crimes">
            <h1>Crimes in New York State</h1>

            <div>
                <label htmlFor="view-select" style={{ marginRight: '10px' }}>Choose a view: </label>
                <select id="view-select" value={selectedView} onChange={e => setSelectedView(e.target.value)} style={dropdownStyle}>
                    <option value="both">Both</option>
                    <option value="heatmap">Heat Map</option>
                    <option value="barchart">Bar Chart</option>
                </select>
            </div>

            {selectedView === 'heatmap' || selectedView === 'both' ? (
                <>
                    <h2>Map of Crimes in Different Counties of New York State</h2>
                    <HeatMap data={counties} />
                </>
            ) : null}

            {selectedView === 'barchart' || selectedView === 'both' ? (
                <>
                    <h2>Bar Chart of Crimes in Different Counties of New York City</h2>
                    <BarChart data={counties} />
                </>
            ) : null}
        </div>
    );
};
