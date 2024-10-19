import React, { useEffect, useState, useMemo } from 'react'
import { Column, useTable } from 'react-table';
import UpdateSchool from '../schoolUpdate';
import DeleteSchool from '../schoolDelete';

type School = {
    id: number,
    name: string,
    decile: number,
    createdAt?: string,
    updatedAt?: string,
    actions?: never;
}

const SchoolList = () => {
    const [backendData, setBackendData] = useState<School[]>([]);
    const [editingSchoolId, setEditingSchoolId] = useState<number | null>(null);
    const [deletingSchoolId, setDeletingSchoolId] = useState<number | null>(null);

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
                const errorMessage = (error as Error).message || 'An unknown error occurred';
                console.error('Fetch error:', errorMessage);
            }
        };

        fetchData();
    }, []);

    // Define columns
    const rawColumns: Column<School>[] = useMemo(() => [
        { Header: 'ID', accessor: 'id' as const },
        { Header: 'School Name', accessor: 'name' as const },
        { Header: 'Decile', accessor: 'decile' as const, },
        { Header: 'Created', accessor: 'createdAt' as const },
        {
            Header: 'Last Updated', accessor: 'updatedAt' as const
        },
        {
            accessor: 'actions',
            Cell: ({ row }: { row: { original: School } }) => (
                <>
                    <button onClick={() => setEditingSchoolId(row.original.id)}>Edit</button>
                    <button onClick={() => setDeletingSchoolId(row.original.id)}>Delete</button>
                </>
            ),
        },
    ], []);

    const {
        getTableProps,
        getTableBodyProps,
        headerGroups,
        rows,
        prepareRow,
    } = useTable({
        columns: rawColumns,
        data: backendData,
    });

    const closeEditModal = () => setEditingSchoolId(null);
    const closeDeleteModal = () => setDeletingSchoolId(null);

    const refreshData = async () => {
        const response = await fetch('/api/school/');
        const data = await response.json() as School[];
        setBackendData(data);
    };

    const handleDelete = (id: number) => {
        setBackendData((prevData) => prevData.filter(school => school.id !== id));
    };

    return (
        <>
            <table {...getTableProps()} className="school-table">
                <tbody {...getTableBodyProps()}>
                    {rows.map(row => {
                        prepareRow(row);
                        return (
                            <tr {...row.getRowProps()}>
                                {row.cells.map(cell => (
                                    <td {...cell.getCellProps()}>{cell.render('Cell')}</td>
                                ))}
                            </tr>
                        );
                    })}
                </tbody>
            </table>

            {editingSchoolId && (
                <UpdateSchool
                    id={editingSchoolId}
                    onClose={closeEditModal}
                    onUpdate={refreshData}
                />
            )}
            {deletingSchoolId && (
                <DeleteSchool
                    id={deletingSchoolId}
                    onClose={closeDeleteModal}
                    onDelete={handleDelete}
                />
            )}
        </>
    );
}

export default SchoolList