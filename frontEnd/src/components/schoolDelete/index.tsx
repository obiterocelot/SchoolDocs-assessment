import React, { useState } from 'react';

interface DeleteSchoolProps {
    id: number;
    onClose: () => void;
    onDelete: (id: number) => void;
}

const DeleteSchool: React.FC<DeleteSchoolProps> = ({ id, onClose, onDelete }) => {
    const handleDelete = async () => {
        try {
            const response = await fetch(`/api/school/${id}`, {
                method: 'DELETE',
            });

            if (response.ok) {
                onDelete(id); // Notify the parent to remove the deleted school
                onClose(); // Close the modal after deletion
            } else {
                console.error('Failed to delete the school');
            }
        } catch (error) {
            console.error('Error deleting school:', error);
        }
    };

    return (
        <div className="modal">
            <h2>Confirm Deletion</h2>
            <p>Are you sure you want to delete this school?</p>
            <button onClick={handleDelete}>Yes, Delete</button>
            <button onClick={onClose}>Cancel</button>
        </div>
    );
};


export default DeleteSchool;
