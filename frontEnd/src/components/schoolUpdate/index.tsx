import React, { useState } from 'react';

// Define the School interface
interface School {
    id: number;
    name: string;
    decile: number;
}

const UpdateSchool: React.FC = () => {
    const [id, setId] = useState<number | ''>('');
    const [name, setName] = useState<string>('');
    const [decile, setDecile] = useState<number | ''>('');
    const [error, setError] = useState<string | null>(null);
    const [successMessage, setSuccessMessage] = useState<string | null>(null);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (id === '' || !name.trim() || decile === '') {
            setError('Please provide a valid ID, name, and decile');
            return;
        }

        const updatedSchoolData = { name: name.trim(), decile: Number(decile) };

        try {
            const response = await fetch(`/api/school/${id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(updatedSchoolData),
            });

            if (!response.ok) {
                throw new Error('Failed to update school');
            }

            const updatedSchool: School = await response.json();
            setSuccessMessage(`School updated: ${updatedSchool.name} with Decile ${updatedSchool.decile}`);
            setError(null);

            setId('');
            setName('');
            setDecile('');
        } catch (error) {
            const errorMessage = (error instanceof Error ? error.message : 'An unknown error occurred');
            setError(errorMessage);
        }
    };

    return (
        <div>
            <h2>Update School</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="schoolId">School ID:</label>
                    <input
                        type="number"
                        id="schoolId"
                        value={id}
                        onChange={(e) => setId(e.target.value === '' ? '' : Number(e.target.value))} // Update ID state
                    />
                </div>
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
                <button type="submit">Update School</button>
            </form>

            {/* Display error message if it occurs */}
            {error && <p style={{ color: 'red' }}>{error}</p>}

            {/* Display success message if the school is updated successfully */}
            {successMessage && <p style={{ color: 'green' }}>{successMessage}</p>}
        </div>
    );
};

export default UpdateSchool;
