import React, { useState } from 'react';

const DeleteSchool: React.FC = () => {
    const [id, setId] = useState<number | ''>('');
    const [error, setError] = useState<string | null>(null);
    const [successMessage, setSuccessMessage] = useState<string | null>(null);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (id === '') {
            setError('Please provide a valid ID');
            return;
        }

        try {
            const response = await fetch(`/api/school/${id}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            if (!response.ok) {
                throw new Error('Failed to delete school');
            }

            setSuccessMessage(`School with ID ${id} deleted successfully`);
            setError(null);

            setId('');
        } catch (error) {
            const errorMessage = (error instanceof Error ? error.message : 'An unknown error occurred');
            setError(errorMessage);
        }
    };

    return (
        <div>
            <h2>Delete School</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="schoolId">School ID:</label>
                    <input
                        type="number"
                        id="schoolId"
                        value={id}
                        onChange={(e) => setId(e.target.value === '' ? '' : Number(e.target.value))}
                    />
                </div>
                <button type="submit">Delete School</button>
            </form>

            {error && <p style={{ color: 'red' }}>{error}</p>}
            {successMessage && <p style={{ color: 'green' }}>{successMessage}</p>}
        </div>
    );
};

export default DeleteSchool;
