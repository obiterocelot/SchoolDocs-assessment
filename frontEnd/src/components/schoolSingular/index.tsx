import React, { useEffect, useState } from 'react'

type School = {
    id: number,
    name: string,
    decile: number,
    createdAt?: Date,
    updatedAt?: Date,
}

const SchoolSingular = () => {
    const [inputId, setInputId] = useState<string>('');
    const [backendData, setBackendData] = useState<School | null>(null)
    const [error, setError] = useState<string | null>(null);

    const fetchSchoolById = async (id: number) => {
        try {
            const response = await fetch('/api/school/${id}');
            if (!response.ok) {
                throw new Error('School not found');
            }
            const data = await response.json() as School;
            console.log(data);
            setBackendData(data);
        } catch (error) {
            // Type assertion to tell TypeScript this is an Error
            const errorMessage = (error as Error).message || 'An unknown error occurred';
            console.error('Fetch error:', errorMessage);
        }
    };

    const handleSubmit = (event: React.FormEvent) => {
        event.preventDefault();
        const parsedId = Number(inputId);
        parsedId ? fetchSchoolById(parsedId) : setError('Please enter a valid number');
    };

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <label htmlFor="schoolId">Enter School ID:</label>
                <input
                    type="text"
                    id="schoolId"
                    value={inputId}
                    onChange={(event) => setInputId((event.target as HTMLInputElement).value)}
                />
                <button type="submit">Fetch School</button>
            </form>

            {error && <p style={{ color: 'red' }}>{error}</p>}

            {backendData && (
                <div>
                    <h3>{backendData.name}</h3>
                    <p>Decile: {backendData.decile}</p>
                </div>
            )}
        </div>
    );
}

export default SchoolSingular