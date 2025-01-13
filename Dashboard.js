import React, { useEffect, useState } from 'react';

const Dashboard = () => {
    const [message, setMessage] = useState('');

    useEffect(() => {
        const fetchData = async () => {
            const response = await fetch('/api/dashboard/', {
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('token')}`
                }
            });
            const data = await response.json();
            setMessage(data.message);
        };

        fetchData();
    }, []);

    return (
        <div>
            <h1>Dashboard</h1>
            <p>{message}</p>
        </div>
    );
};

export default Dashboard;
