import { useState, useMemo } from 'react';
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
import { DataGrid } from '@mui/x-data-grid';
import usersSeed from '../../data/users.json?raw';

const roles = ['admin', 'editor', 'viewer'];
const genders = ['male', 'female', 'other'];

const blankForm = {
    firstName: '',
    lastName: '',
    age: '',
    gender: '',
    contactNumber: '',
    email: '',
    role: 'editor',
    username: '',
    password: '',
    address: '',
    isActive: true,
};

const labelize = (value) =>
    value ? `${value.charAt(0).toUpperCase()}${value.slice(1)}` : '';

const loadUsers = () => {
    try {
        return {
            users: JSON.parse(usersSeed).map((user, index) => ({
                id: Number(user.id) || index + 1,
                firstName: String(user.firstName ?? '').trim(),
                lastName: String(user.lastName ?? '').trim(),
                age: String(user.age ?? '').trim(),
                gender: genders.includes(String(user.gender ?? '').trim().toLowerCase())
                    ? String(user.gender ?? '').trim().toLowerCase()
                    : '',
                contactNumber: String(user.contactNumber ?? '').trim(),
                email: String(user.email ?? '').trim().toLowerCase(),
                role: roles.includes(String(user.role ?? '').trim().toLowerCase())
                    ? String(user.role ?? '').trim().toLowerCase()
                    : 'editor',
                username: String(user.username ?? '').trim().toLowerCase(),
                password: String(user.password ?? ''),
                address: String(user.address ?? '').trim(),
                isActive: typeof user.isActive === 'boolean' ? user.isActive : true,
            })),
            error: '',
        };
    } catch {
        return {
            users: [],
            error: 'Unable to read users data.',
        };
    }
};

const seed = loadUsers();

const UsersPage = () => {
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
    const [users, setUsers] = useState(seed.users);

    // Enhancement 2: Create and design a search and filter.
    const [searchQuery, setSearchQuery] = useState('');
    const [filterRole, setFilterRole] = useState('all');
    const [filterGender, setFilterGender] = useState('all');
    const [filterStatus, setFilterStatus] = useState('all');

    const [modal, setModal] = useState({ open: false, id: null });
    const [form, setForm] = useState(blankForm);
    const [errors, setErrors] = useState({});
    const [showPassword, setShowPassword] = useState(false);

    const filteredUsers = useMemo(() => {
        return users.filter((user) => {
            const searchLower = searchQuery.toLowerCase();
            const matchesSearch = 
                user.firstName.toLowerCase().includes(searchLower) ||
                user.lastName.toLowerCase().includes(searchLower) ||
                user.email.toLowerCase().includes(searchLower) ||
                user.username.toLowerCase().includes(searchLower);
            
            const matchesRole = filterRole === 'all' || user.role === filterRole;
            const matchesGender = filterGender === 'all' || user.gender === filterGender;
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
        setModal({ open: true, id: user?.id ?? null });
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

    // Enhancement 3: Improve form validation with beginner-friendly rules
    const validate = () => {
      const nextErrors = {};
      const email = form.email.trim().toLowerCase();
      const username = form.username.trim();

      [
          ['firstName', 'First name'], 
          ['lastName', 'Last name'], 
          ['age', 'Age'], 
          ['gender', 'Gender'], 
          ['contactNumber', 'Contact number'], 
          ['email', 'Email'], 
          ['role', 'Role'], 
          ['username', 'Username'], 
          ['password', 'Password'], 
          ['address', 'Address']
      ].forEach(([key, label]) => {
          if (!String(form[key]).trim()) {
              nextErrors[key] = `${label} is required.`;
          }
      });

      if (!nextErrors.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
          nextErrors.email = 'Enter a valid email address.';
      }

      if (!nextErrors.password && form.password.length < 8) {
          nextErrors.password = 'Password must be at least 8 characters long.';
      }

      if (!nextErrors.contactNumber && !/^\d{11}$/.test(form.contactNumber.trim())) {
          nextErrors.contactNumber = 'Contact number must be exactly 11 digits.';
      }

      const ageValue = form.age.trim();
      if (!nextErrors.age && (isNaN(ageValue) || !Number.isInteger(Number(ageValue)))) {
          nextErrors.age = 'Age must be a valid whole number.';
      }

      if (!nextErrors.username && /\s/.test(username)) {
          nextErrors.username = 'Username cannot contain spaces.';
      }

      if (!nextErrors.email && users.some((user) => user.id !== modal.id && user.email === email)) {
          nextErrors.email = 'Email address already exists.';
      }

      if (!nextErrors.username && users.some((user) => user.id !== modal.id && user.username === username.toLowerCase())) {
          nextErrors.username = 'Username already exists.';
      }

      return nextErrors;
  };

  const handleSubmit = (event) => {
      event.preventDefault();
      const nextErrors = validate();
      if (Object.keys(nextErrors).length) {
          setErrors(nextErrors);
          return;
      }

      const nextUser = {
          ...form,
          firstName: form.firstName.trim(),
          lastName: form.lastName.trim(),
          email: form.email.trim().toLowerCase(),
          username: form.username.trim().toLowerCase(),
      };

      setUsers((prev) =>
          modal.id
              ? prev.map((user) => (user.id === modal.id ? { ...user, ...nextUser } : user))
              : [...prev, { ...nextUser, id: prev.reduce((max, user) => Math.max(max, Number(user.id) || 0), 0) + 1 }]
      );
      closeModal();
  };

  const toggleStatus = (id) => {
      setUsers((prev) => prev.map((user) => user.id === id ? { ...user, isActive: !user.isActive } : user));
  };

  const fieldProps = (name, label, extra = {}) => ({
      name, label, value: form[name], onChange: handleChange,
      error: Boolean(errors[name]), helperText: errors[name],
      fullWidth: true, ...extra,
  });

  const columns = [
      { field: 'id', headerName: 'ID', width: 60 },
      { field: 'fullName', headerName: 'Full Name', flex: 1.5, minWidth: 150, valueGetter: (_, row) => `${row.firstName} ${row.lastName}`.trim() },
      { field: 'username', headerName: 'Username', flex: 1, minWidth: 120 },
      { field: 'age', headerName: 'Age', width: 60 },
      { field: 'gender', headerName: 'Gender', width: 90, valueGetter: (_, row) => labelize(row.gender) },
      { field: 'contactNumber', headerName: 'Contact', flex: 1, minWidth: 130 },
      { field: 'email', headerName: 'Email', flex: 1.5, minWidth: 180 },
      { field: 'role', headerName: 'Role', width: 100, valueGetter: (_, row) => labelize(row.role) },
      { field: 'status', headerName: 'Status', width: 100, renderCell: ({ row }) => (
          <Chip size="small" label={row.isActive ? 'Active' : 'Inactive'} color={row.isActive ? 'success' : 'default'} variant={row.isActive ? 'filled' : 'outlined'} />
      )},
      { field: 'actions', headerName: 'Actions', width: 180, renderCell: ({ row }) => (
          <Stack direction="row" spacing={1} sx={{ py: 0.5 }}>
              <Button size="small" variant="outlined" onClick={() => openModal(row)}>Edit</Button>
              <Button size="small" variant="contained" color={row.isActive ? 'warning' : 'success'} onClick={() => toggleStatus(row.id)}>{row.isActive ? 'Disable' : 'Activate'}</Button>
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
            sx=
            {{ p: 2, mb: 3, 
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

          {seed.error && <Alert severity="error" sx={{ mb: 2 }}>{seed.error}</Alert>}

          <Paper 
          sx=
            {{ p: 2, overflow: 'hidden', 
              borderRadius: 3, 
              border: '1px solid #e0e0e0', 
              boxShadow: 'none', 
              backgroundColor: '#fff' 
            }}
          >
              {filteredUsers.length ? (
                  <Box sx={{ height: 520, width: '100%' }}>
                      <DataGrid
                          rows={filteredUsers}
                          columns={columns}
                          disableRowSelectionOnClick
                          pageSizeOptions={[5, 10]}
                          initialState={{ pagination: { paginationModel: { pageSize: 5 } } }}
                          sx={{ border: 'none' }}
                      />
                  </Box>
              ) : (
                  <Alert severity="info">No users match your filter criteria.</Alert>
              )}
          </Paper>

          <Dialog open={modal.open} onClose={closeModal} fullWidth fullScreen={isMobile} maxWidth="md">
              <Box component="form" onSubmit={handleSubmit}>
                  <DialogTitle>{modal.id ? 'Edit User' : 'Add User'}</DialogTitle>
                  <DialogContent dividers>
                      <Stack spacing={2} sx={{ pt: 1 }}>
                          <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
                              <TextField {...fieldProps('firstName', 'First Name')} />
                              <TextField {...fieldProps('lastName', 'Last Name')} />
                          </Stack>
                          <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
                              <TextField {...fieldProps('age', 'Age')} />
                              <TextField {...fieldProps('gender', 'Gender', { select: true })}>
                                  {genders.map(g => <MenuItem key={g} value={g}>{labelize(g)}</MenuItem>)}
                              </TextField>
                          </Stack>
                          <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
                              <TextField {...fieldProps('contactNumber', 'Contact Number')} />
                              <TextField {...fieldProps('email', 'Email Address', { type: 'email' })} />
                          </Stack>
                          <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
                              <TextField {...fieldProps('role', 'Role', { select: true })}>
                                  {roles.map(r => <MenuItem key={r} value={r}>{labelize(r)}</MenuItem>)}
                              </TextField>
                              <TextField {...fieldProps('username', 'Username')} />
                          </Stack>
                          <TextField {...fieldProps('password', 'Password', {
                              type: showPassword ? 'text' : 'password',
                              slotProps: { input: { endAdornment: (
                                  <InputAdornment position="end">
                                      <IconButton edge="end" onClick={() => setShowPassword(!showPassword)} onMouseDown={e => e.preventDefault()}>
                                          {showPassword ? <VisibilityOff /> : <Visibility />}
                                      </IconButton>
                                  </InputAdornment>
                              )}}
                          })} />
                          <TextField {...fieldProps('address', 'Address', { multiline: true, rows: 3 })} />
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