import React, { useEffect, useState } from 'react';

const MemberDirectory = () => {
    const [members, setMembers] = useState([]);

    useEffect(() => {
        const fetchMembers = async () => {
            const response = await fetch('/api/members/', {
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('token')}`
                }
            });
            const data = await response.json();
            setMembers(data);
        };

        fetchMembers();
    }, []);

    return (
        <div>
            <h1>Member Directory</h1>
            <ul>
                {members.map(member => (
                    <li key={member.id}>{member.username} - {member.email}</li>
                ))}
            </ul>
        </div>
    );
};

export default MemberDirectory;
