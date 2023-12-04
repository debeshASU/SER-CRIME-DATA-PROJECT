import Axios from 'axios';
import { useState, useEffect } from 'react';
import PieChart from './PieChart'; 

export const PoliceKilling = () => {
    const [ageData, setAgeData] = useState([]);
    const [raceData, setRaceData] = useState([]);
    const [genderData, setGenderData] = useState([]);
    const [currentView, setCurrentView] = useState('age'); 

    const fetchVictimAgeGroups = async () => {
        try {
            const response = await Axios.get('http://localhost:4500/policeVictimAge');
            const formattedData = Object.entries(response.data).map(([key, value]) => ({
                name: key,
                value: parseInt(value)
            }));
            setAgeData(formattedData);
        } catch (err) {
            console.log(err);
        }
    };

    const fetchVictimRace = async () => {
        try {
            const response = await Axios.get('http://localhost:4500/policeVictimRace');
            const formattedData = Object.entries(response.data).map(([key, value]) => ({
                name: key,
                value: parseInt(value)
            }));
            setRaceData(formattedData);
        } catch (err) {
            console.log(err);
        }
    };

    const fetchVictimGender = async () => {
        try {
            const response = await Axios.get('http://localhost:4500/policeVictimGender');
            const formattedData = Object.entries(response.data).map(([key, value]) => ({
                name: key,
                value: parseInt(value)
            }));
            setGenderData(formattedData);
        } catch (err) {
            console.log(err);
        }
    };

    useEffect(() => {
        fetchVictimAgeGroups();
        fetchVictimRace();
        fetchVictimGender();
    }, []);

    
    const buttonStyle = {
        padding: '10px 20px',
        margin: '10px',
        fontSize: '16px',
        border: 'none',
        borderRadius: '5px',
        cursor: 'pointer',
        backgroundColor: '#4CAF50', 
        color: 'white' 
    };

    
    const containerStyle = {
        textAlign: 'center'
    };

    const chartContainerStyle = {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        flexWrap: 'wrap'
    };

    const textStyle = {
        marginTop: '20px',
        width: '100%',
        fontWeight: 'bold',
        fontSize: '18px',
        color: '#333'
    };

    return (
        <div style={containerStyle}>
            <h1>Statistics related to Police Killings</h1>

            <div>
                <button style={buttonStyle} onClick={() => setCurrentView('age')}>Age Group</button>
                <button style={buttonStyle} onClick={() => setCurrentView('race')}>Race</button>
                <button style={buttonStyle} onClick={() => setCurrentView('gender')}>Gender</button>
            </div>

            <div style={chartContainerStyle}>
                {currentView === 'age' && (
                    <div>
                        <PieChart data={ageData} />
                        <div style={textStyle}>Victims Age Groups</div>
                    </div>
                )}
                {currentView === 'race' && (
                    <div>
                        <PieChart data={raceData} />
                        <div style={textStyle}>Victims Race</div>
                    </div>
                )}
                {currentView === 'gender' && (
                    <div>
                        <PieChart data={genderData} />
                        <div style={textStyle}>Victims Gender</div>
                    </div>
                )}
            </div>
        </div>
    );
};
