import { useState } from "react";
import { Box, Button, IconButton, MenuItem, Paper, Select, Table, TableBody, TableCell, TableHead, TableRow, TextField, Typography } from "@mui/material";
import { Delete } from "@mui/icons-material";
import { useAccount } from "../../lib/hooks/useAccount";


export default function UserManagement() {
  const [search, setSearch] = useState("");
  const {users, updateRole, deleteUser} = useAccount();
 
  const filteredUsers = users.filter(user => user.displayName.toLowerCase().includes(search.toLowerCase()));

  return (
    <Paper sx={{ p: 3 }}>
      <Typography variant="h4" gutterBottom>User Management</Typography>
      <Box display="flex" justifyContent="space-between" mb={2}>
        <TextField label="Search" value={search} onChange={e => setSearch(e.target.value)} />
        <Button variant="contained" href="/register">Add User</Button>
      </Box>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Name</TableCell>
            <TableCell>Email</TableCell>
            <TableCell>Role</TableCell>
            <TableCell>Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {filteredUsers.map(user => (
            <TableRow key={user.id}>
              <TableCell>{user.displayName}</TableCell>
              <TableCell>{user.email}</TableCell>
              <TableCell>
                <Select
                  value={user.roles[0]}
                  onChange={(e) => updateRole.mutate({ userId: user.id, newRole: e.target.value })}
                >
                  {['admin', 'edit', 'view'].map(role => <MenuItem key={role} value={role}>{role}</MenuItem>)}
                </Select>
              </TableCell>
              <TableCell>
                <IconButton onClick={() => deleteUser.mutate(user.id)}>
                  <Delete color="error" />
                </IconButton>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Paper>
  );
}