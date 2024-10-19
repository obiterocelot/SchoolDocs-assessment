import React, { useEffect, useState } from 'react';

// Define the School interface
interface School {
    id: number;
    name: string;
    decile: number;
}

interface EditSchoolModalProps {
    id: number;
    onClose: () => void;
    onUpdate: () => void;
}
const UpdateSchool: React.FC<EditSchoolModalProps> = ({ id, onClose, onUpdate }) => {
    const [schoolData, setSchoolData] = useState<{ name: string; decile: number }>({ name: '', decile: 0 });

    useEffect(() => {
        const fetchSchool = async () => {
            const response = await fetch(`/api/school/${id}`);
            const data = await response.json();
            setSchoolData(data);
        };

        fetchSchool();
    }, [id]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        const response = await fetch(`/api/school/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(schoolData),
        });

        if (response.ok) {
            onUpdate();
            onClose();
        } else {
            console.error('Failed to update the school');
        }
    };

    return (
        <div className="modal">
            <h2>Edit School</h2>
            <form onSubmit={handleSubmit}>
                <label>
                    Name:
                    <input
                        type="text"
                        value={schoolData.name}
                        onChange={(e) => setSchoolData({ ...schoolData, name: e.target.value })}
                        required
                    />
                </label>
                <label>
                    Decile:
                    <input
                        type="number"
                        value={schoolData.decile}
                        onChange={(e) => setSchoolData({ ...schoolData, decile: Number(e.target.value) })}
                        required
                    />
                </label>
                <button type="submit">Update School</button>
                <button type="button" onClick={onClose}>Cancel</button>
            </form>
        </div>
    );
};
export default UpdateSchool;
