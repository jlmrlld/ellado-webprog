import { useState, useMemo, useEffect } from 'react';
import {
    Alert,
    Box,
    Button,
    Chip,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    FormControlLabel,
    IconButton,
    InputAdornment,
    MenuItem,
    Paper,
    Stack,
    Switch,
    TextField,
    Typography,
    useMediaQuery,
} from '@mui/material';
import { useTheme } from '@mui/material/styles';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import SearchIcon from '@mui/icons-material/Search';
import AccountCircle from '@mui/icons-material/AccountCircle';
import { DataGrid } from '@mui/x-data-grid';
import { fetchUsers, createUser, updateUser } from '../../services/UserService';

const roles = ['admin', 'editor', 'viewer'];
const genders = ['male', 'female', 'other'];

const blankForm = {
    firstName: '',
    lastName: '',
    age: '',
    gender: '',
    contactNumber: '',
    email: '',
    type: 'editor', // Changed to match schema 'type' field
    username: '',
    password: '',
    address: '',
    isActive: true,
};

const labelize = (value) =>
    value ? `${value.charAt(0).toUpperCase()}${value.slice(1)}` : '';

const UsersPage = () => {
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
    
    // Core database connection states
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [connectionError, setConnectionError] = useState('');

    // Filter and search states
    const [searchQuery, setSearchQuery] = useState('');
    const [filterRole, setFilterRole] = useState('all');
    const [filterGender, setFilterGender] = useState('all');
    const [filterStatus, setFilterStatus] = useState('all');

    const [modal, setModal] = useState({ open: false, id: null });
    const [form, setForm] = useState(blankForm);
    const [errors, setErrors] = useState({});
    const [showPassword, setShowPassword] = useState(false);

    // Fetch live data from backend server
    const loadUsers = async () => {
        try {
            setLoading(true);

            const { data } = await fetchUsers(); 
            setUsers(data || []); // ✔ correct

            setConnectionError('');
        } catch (error) {
            console.error('Error fetching users:', error);
            setConnectionError('Unable to load real-time database content.');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        loadUsers();
    }, []);

    // Filter computation logic matching your original setup
    const filteredUsers = useMemo(() => {
        return users.filter((user) => {
            const searchLower = searchQuery.toLowerCase();
            const matchesSearch = 
                (user.firstName || '').toLowerCase().includes(searchLower) ||
                (user.lastName || '').toLowerCase().includes(searchLower) ||
                (user.email || '').toLowerCase().includes(searchLower) ||
                (user.username || '').toLowerCase().includes(searchLower);
            
            const matchesRole = filterRole === 'all' || user.type === filterRole;
            const matchesGender = filterGender === 'all' || (user.gender || '').toLowerCase() === filterGender;
            const matchesStatus = filterStatus === 'all' || 
                (filterStatus === 'active' ? user.isActive : !user.isActive);

            return matchesSearch && matchesRole && matchesGender && matchesStatus;
        });
    }, [users, searchQuery, filterRole, filterGender, filterStatus]);

    const resetForm = () => {
        setForm({ ...blankForm });
        setErrors({});
    };

    const openModal = (user) => {
        setModal({ open: true, id: user?._id ?? null });
        setForm(user ? { ...blankForm, ...user } : { ...blankForm });
        setErrors({});
    };

    const closeModal = () => {
        setModal({ open: false, id: null });
        setShowPassword(false);
        resetForm();
    };

    const handleChange = ({ target: { name, value, checked, type } }) => {
        setForm((prev) => ({
            ...prev,
            [name]: type === 'checkbox' ? checked : value,
        }));
        if (errors[name]) setErrors((prev) => ({ ...prev, [name]: '' }));
    };

    const validate = () => {
        const nextErrors = {};
        const email = (form.email || '').trim().toLowerCase();
        const username = (form.username || '').trim();

        [
            ['firstName', 'First name'], 
            ['lastName', 'Last name'], 
            ['age', 'Age'], 
            ['gender', 'Gender'], 
            ['contactNumber', 'Contact number'], 
            ['email', 'Email'], 
            ['type', 'Role'], 
            ['username', 'Username'], 
            ['address', 'Address']
        ].forEach(([key, label]) => {
            if (!String(form[key] ?? '').trim()) {
                nextErrors[key] = `${label} is required.`;
            }
        });

        if (!modal.id && !String(form.password ?? '').trim()) {
            nextErrors.password = 'Password is required.';
        }

        if (!nextErrors.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
            nextErrors.email = 'Enter a valid email address.';
        }

        if (!nextErrors.password && form.password && form.password.length < 8) {
            nextErrors.password = 'Password must be at least 8 characters long.';
        }

        if (!nextErrors.contactNumber && !/^\d{11}$/.test((form.contactNumber || '').trim())) {
            nextErrors.contactNumber = 'Contact number must be exactly 11 digits.';
        }

        const ageValue = String(form.age || '').trim();
        if (!nextErrors.age && (isNaN(ageValue) || !Number.isInteger(Number(ageValue)))) {
            nextErrors.age = 'Age must be a valid whole number.';
        }

        if (!nextErrors.username && /\s/.test(username)) {
            nextErrors.username = 'Username cannot contain spaces.';
        }

        return nextErrors;
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        const nextErrors = validate();
        if (Object.keys(nextErrors).length) {
            setErrors(nextErrors);
            return;
        }

        const payload = {
            ...form,
            firstName: form.firstName.trim(),
            lastName: form.lastName.trim(),
            email: form.email.trim().toLowerCase(),
            username: form.username.trim().toLowerCase(),
        };

        try {
            if (modal.id) {
                if (!payload.password) delete payload.password;
                await updateUser(modal.id, payload);
            } else {
                await createUser(payload);
            }
            loadUsers();
            closeModal();
        } catch (error) {
            console.error('Error handling form submit:', error);
        }
    };

    const toggleStatus = async (row) => {
        try {
            await updateUser(row._id, { isActive: !row.isActive });
            loadUsers();
        } catch (error) {
            console.error('Error switching active status:', error);
        }
    };

    const fieldProps = (name, label, extra = {}) => ({
        name, label, value: form[name] ?? '', onChange: handleChange,
        error: Boolean(errors[name]), helperText: errors[name],
        fullWidth: true, variant: "standard", ...extra,
    });

    const columns = [
        { field: '_id', headerName: 'ID', width: 100 },
        { field: 'fullName', headerName: 'Full Name', flex: 1.5, minWidth: 150, valueGetter: (_, row) => `${row.firstName || ''} ${row.lastName || ''}`.trim() },
        { field: 'username', headerName: 'Username', flex: 1, minWidth: 120 },
        { field: 'age', headerName: 'Age', width: 60 },
        { field: 'gender', headerName: 'Gender', width: 90, valueGetter: (_, row) => labelize(row.gender) },
        { field: 'contactNumber', headerName: 'Contact', flex: 1, minWidth: 130 },
        { field: 'email', headerName: 'Email', flex: 1.5, minWidth: 180 },
        { field: 'type', headerName: 'Role', width: 100, valueGetter: (_, row) => labelize(row.type) },
        { field: 'status', headerName: 'Status', width: 100, renderCell: ({ row }) => (
            <Chip size="small" label={row.isActive ? 'Active' : 'Inactive'} color={row.isActive ? 'success' : 'default'} variant={row.isActive ? 'filled' : 'outlined'} />
        )},
        { field: 'actions', headerName: 'Actions', width: 180, renderCell: ({ row }) => (
            <Stack direction="row" spacing={1} sx={{ py: 0.5 }}>
                <Button size="small" variant="outlined" onClick={() => openModal(row)}>Edit</Button>
                <Button size="small" variant="contained" color={row.isActive ? 'warning' : 'success'} onClick={() => toggleStatus(row)}>{row.isActive ? 'Disable' : 'Activate'}</Button>
            </Stack>
        )},
    ];

    return (
        <Box sx={{ width: '100%' }}>
            <Box sx={{ mb: 3, display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 2 }}>
                <Typography variant="h4">Users</Typography>
                <Button variant="contained" onClick={() => openModal()}>Add User</Button>
            </Box>

            <Paper 
                sx={{ p: 2, mb: 3, 
                borderRadius: 3, 
                border: '1px solid #e0e0e0', 
                boxShadow: 'none', 
                backgroundColor: '#fff' 
                }}
            >
                <Stack direction={{ xs: 'column', md: 'row' }} spacing={2}>
                    <TextField
                        fullWidth
                        size="small"
                        placeholder="Search name, email, or username..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        InputProps={{
                            startAdornment: (
                                <InputAdornment position="start">
                                    <SearchIcon color="action" />
                                </InputAdornment>
                            ),
                        }}
                    />
                    <Stack direction="row" spacing={1}>
                        <TextField
                            select
                            size="small"
                            label="Role"
                            value={filterRole}
                            onChange={(e) => setFilterRole(e.target.value)}
                            sx={{ minWidth: 110 }}
                        >
                            <MenuItem value="all">All Roles</MenuItem>
                            {roles.map(r => <MenuItem key={r} value={r}>{labelize(r)}</MenuItem>)}
                        </TextField>
                        <TextField
                            select
                            size="small"
                            label="Gender"
                            value={filterGender}
                            onChange={(e) => setFilterGender(e.target.value)}
                            sx={{ minWidth: 110 }}
                        >
                            <MenuItem value="all">All</MenuItem>
                            {genders.map(g => <MenuItem key={g} value={g}>{labelize(g)}</MenuItem>)}
                        </TextField>
                        <TextField
                            select
                            size="small"
                            label="Status"
                            value={filterStatus}
                            onChange={(e) => setFilterStatus(e.target.value)}
                            sx={{ minWidth: 110 }}
                        >
                            <MenuItem value="all">All</MenuItem>
                            <MenuItem value="active">Active</MenuItem>
                            <MenuItem value="inactive">Inactive</MenuItem>
                        </TextField>
                    </Stack>
                </Stack>
            </Paper>

            {connectionError && <Alert severity="error" sx={{ mb: 2 }}>{connectionError}</Alert>}

            <Paper 
                sx={{ p: 2, overflow: 'hidden', 
                    borderRadius: 3, 
                    border: '1px solid #e0e0e0', 
                    boxShadow: 'none', 
                    backgroundColor: '#fff' 
                }}
            >
                <Box sx={{ height: 520, width: '100%' }}>
                    <DataGrid
                        rows={filteredUsers}
                        columns={columns}
                        getRowId={(row) => row._id}
                        loading={loading}
                        disableRowSelectionOnClick
                        pageSizeOptions={[5, 10]}
                        initialState={{ pagination: { paginationModel: { pageSize: 5 } } }}
                        sx={{ border: 'none' }}
                    />
                </Box>
            </Paper>

            <Dialog open={modal.open} onClose={closeModal} fullWidth fullScreen={isMobile} maxWidth="md">
                <Box component="form" onSubmit={handleSubmit}>
                    <DialogTitle>{modal.id ? 'Edit User' : 'Add User'}</DialogTitle>
                    <DialogContent dividers>
                        <Stack spacing={3} sx={{ pt: 1 }}>
                            <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
                                <TextField {...fieldProps('firstName', 'First Name', {
                                    slotProps: { input: { startAdornment: <InputAdornment position="start"><AccountCircle color="action" /></InputAdornment> } }
                                })} />
                                <TextField {...fieldProps('lastName', 'Last Name', {
                                    slotProps: { input: { startAdornment: <InputAdornment position="start"><AccountCircle color="action" /></InputAdornment> } }
                                })} />
                            </Stack>
                            <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
                                <TextField {...fieldProps('age', 'Age', {
                                    slotProps: { input: { startAdornment: <InputAdornment position="start"><AccountCircle color="action" /></InputAdornment> } }
                                })} />
                                <TextField {...fieldProps('gender', 'Gender', { 
                                    select: true,
                                    slotProps: { input: { startAdornment: <InputAdornment position="start"><AccountCircle color="action" /></InputAdornment> } }
                                })}>
                                    {genders.map(g => <MenuItem key={g} value={g}>{labelize(g)}</MenuItem>)}
                                </TextField>
                            </Stack>
                            <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
                                <TextField {...fieldProps('contactNumber', 'Contact Number', {
                                    slotProps: { input: { startAdornment: <InputAdornment position="start"><AccountCircle color="action" /></InputAdornment> } }
                                })} />
                                <TextField {...fieldProps('email', 'Email Address', { 
                                    type: 'email',
                                    slotProps: { input: { startAdornment: <InputAdornment position="start"><AccountCircle color="action" /></InputAdornment> } }
                                })} />
                            </Stack>
                            <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
                                <TextField {...fieldProps('type', 'Role', { 
                                    select: true,
                                    slotProps: { input: { startAdornment: <InputAdornment position="start"><AccountCircle color="action" /></InputAdornment> } }
                                })}>
                                    {roles.map(r => <MenuItem key={r} value={r}>{labelize(r)}</MenuItem>)}
                                </TextField>
                                <TextField {...fieldProps('username', 'Username', {
                                    slotProps: { input: { startAdornment: <InputAdornment position="start"><AccountCircle color="action" /></InputAdornment> } }
                                })} />
                            </Stack>
                            <TextField {...fieldProps('password', 'Password', {
                                type: showPassword ? 'text' : 'password',
                                slotProps: { 
                                    input: { 
                                        startAdornment: <InputAdornment position="start"><AccountCircle color="action" /></InputAdornment>,
                                        endAdornment: (
                                            <InputAdornment position="end">
                                                <IconButton edge="end" onClick={() => setShowPassword(!showPassword)} onMouseDown={e => e.preventDefault()}>
                                                    {showPassword ? <VisibilityOff /> : <Visibility />}
                                                </IconButton>
                                            </InputAdornment>
                                        )
                                    } 
                                }
                            })} />
                            <TextField {...fieldProps('address', 'Address', { 
                                multiline: true, 
                                rows: 3,
                                slotProps: { input: { startAdornment: <InputAdornment position="start" sx={{ alignSelf: 'flex-start', mt: 0.5 }}><AccountCircle color="action" /></InputAdornment> } }
                            })} />
                            <FormControlLabel control={<Switch name="isActive" checked={form.isActive} onChange={handleChange} />} label={form.isActive ? 'Active' : 'Inactive'} />
                        </Stack>
                    </DialogContent>
                    <DialogActions sx={{ p: 2 }}>
                        <Button onClick={closeModal}>Cancel</Button>
                        <Button type="submit" variant="contained">{modal.id ? 'Update' : 'Save'}</Button>
                    </DialogActions>
                </Box>
            </Dialog>
        </Box>
    );
};

export default UsersPage;