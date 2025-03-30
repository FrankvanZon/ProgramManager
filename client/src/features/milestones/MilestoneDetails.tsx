import { useState } from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, TextField, Button, Box } from '@mui/material';



const MilestoneDetails = ({ data }) => {
    const [rows, setRows] = useState(data);

    const handleChange = (index: number, field: string, value: string) => {
        const updatedRows = [...rows];
        updatedRows[index][field] = value;
        setRows(updatedRows);
    };

    const handleSave = () => {
        // Save logic here
        console.log('Saved data:', rows);
    };

    return (
        <TableContainer component={Paper} sx={{borderRadius: 2, padding: 2, mb: 2}}>
            <Table>
                <TableHead>
                    <TableRow>
                        <TableCell>Milestone</TableCell>
                        <TableCell>Plan</TableCell>
                        
                    </TableRow>
                </TableHead>
                <TableBody>
                    {rows.map((row, index: number) => (
                        <TableRow key={row.id}>
                            <TableCell>{row.name}</TableCell>
                            <TableCell>
                                <TextField
                                    value={row.age}
                                    onChange={(e) => handleChange(index, 'name', e.target.value)}
                                />
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
            <Box display="flex" justifyContent="flex-end" padding={2}>
                <Button onClick={handleSave} variant="contained" color="primary">Save All</Button>
            </Box>
        </TableContainer>
    );
};


export default MilestoneDetails;
