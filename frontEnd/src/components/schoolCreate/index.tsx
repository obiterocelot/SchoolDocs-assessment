
import React, { useEffect, useState } from 'react'

type School = {
    id: number,
    name: string,
    decile: number,
}

const SchoolCreate = () => {
    const [name, setName] = useState<string>('');
    const [decile, setDecile] = useState<number | ''>('');
    const [error, setError] = useState<string | null>(null);
    const [successMessage, setSuccessMessage] = useState<string | null>(null);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!name.trim() || decile === '') {
            setError('Please provide a valid name and decile');
            return;
        }

        const schoolData = { name: name.trim(), decile: Number(decile) };
        try {
            const response = await fetch('/api/school/', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(schoolData),
            });

            if (!response.ok) {
                throw new Error('Failed to create school');
            }

            const newSchool = await response.json();
            setSuccessMessage(`School created: ${newSchool.name} with Decile ${newSchool.decile}`);
            setError(null);
            setName('');
            setDecile('');
        } catch (error) {
            const errorMessage = (error instanceof Error ? error.message : 'An unknown error occurred');
            setError(errorMessage);
        }
    };

    return (
        <div>
            <h2>Create a New School</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="schoolName">School Name:</label>
                    <input
                        type="text"
                        id="schoolName"
                        value={name}
                        onChange={(e) => setName(e.target.value)} // Update name state
                    />
                </div>
                <div>
                    <label htmlFor="schoolDecile">Decile:</label>
                    <input
                        type="number"
                        id="schoolDecile"
                        value={decile}
                        onChange={(e) => setDecile(e.target.value === '' ? '' : Number(e.target.value))} // Update decile state
                    />
                </div>
                <button type="submit">Create School</button>
            </form>

            {error && <p style={{ color: 'red' }}>{error}</p>}

            {successMessage && <p style={{ color: 'green' }}>{successMessage}</p>}
        </div>
    );
}

export default SchoolCreate