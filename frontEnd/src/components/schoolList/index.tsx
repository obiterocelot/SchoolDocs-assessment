import React, { useEffect, useState } from 'react'

type School = {
    id: number,
    name: string,
    decile: number,
    createdAt?: Date,
    updatedAt?: Date,
}

const SchoolList = () => {
    const [backendData, setBackendData] = useState<School[]>([])

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch('/api/school/');
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                const data = await response.json() as School[];
                console.log(data);
                setBackendData(data);
            } catch (error) {
                // Type assertion to tell TypeScript this is an Error
                const errorMessage = (error as Error).message || 'An unknown error occurred';
                console.error('Fetch error:', errorMessage);
            }
        };

        fetchData();
    }, []);
    return (
        < div >
            {
                backendData.map((post, i) => (
                    <p key={i}> {JSON.stringify(post)} </p>
                ))
            }
        </div >
    );
}

export default SchoolList