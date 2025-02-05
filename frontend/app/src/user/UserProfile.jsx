import React, { useState } from 'react';
import {
  Box,
  Card,
  Typography,
  TextField,
  Button,
  Grid,
  Avatar,
  Divider,
  IconButton,
  MenuItem,
  Select,
  InputLabel,
  FormControl,
} from '@mui/material';
import UserSidebar from './UserSidebar';
import Navbar from './Navbar';
import PhotoCameraIcon from '@mui/icons-material/PhotoCamera';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const UserProfile = () => {
  const [userDetails, setUserDetails] = useState({
    name: 'Amol Dangi',
    email: 'amol.dangi@example.com',
    phone: '+91-123-456-7890',
    gender: 'Male',
    address: 'United States',
    avatarUrl: 'https://via.placeholder.com/150',
    dob: '10 Aug, 1980',
    joiningDate: '15 Sep, 2021',
    lastLogin: '12 Jan, 2025',
    regMethod: 'Email',
    state: '',
    city: '',
    zipCode: '',
    adharNo: 'XXXX-XXXX-XXXX',
    panNo: 'AAAAA1234A',
    bankAccountNo: '1234567890123456',
  });

  const [isEditing, setIsEditing] = useState(false);
  const [formValues, setFormValues] = useState(userDetails);

  const [isChangingPassword, setIsChangingPassword] = useState(false);
  const [passwordForm, setPasswordForm] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValues({ ...formValues, [name]: value });
  };

  const handlePasswordChange = (e) => {
    const { name, value } = e.target;
    setPasswordForm({ ...passwordForm, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setUserDetails(formValues);
    setIsEditing(false);
    toast.success('Profile updated successfully!');
  };

  const handlePasswordSubmit = (e) => {
    e.preventDefault();
    if (passwordForm.newPassword === passwordForm.confirmPassword) {
      // Proceed with password change logic
      setIsChangingPassword(false);
      toast.success('Password changed successfully!');
    } else {
      toast.error('Passwords do not match!');
    }
  };

  const handleProfilePicChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setUserDetails({ ...userDetails, avatarUrl: reader.result });
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <Box display="flex" minHeight="100vh" flexDirection="column">
      <Navbar />
      <ToastContainer />
      <Box display="flex" flex={1}>
        <Box width={{ xs: '100%', md: '20%' }} minHeight="100vh">
          <UserSidebar />
        </Box>
        <Box width={{ xs: '100%', md: '80%' }} p={4}>
          <Typography variant="h4" color="primary" gutterBottom>
            User Profile
          </Typography>

          <Card sx={{ p: 3, maxWidth: 900, margin: '0 auto' }}>
            <Grid container spacing={4}>
              {/* Profile Picture and Basic Info */}
              <Grid item xs={12} md={4} textAlign="center">
                <Box sx={{ position: 'relative', display: 'inline-block' }}>
                  <Avatar
                    src={userDetails.avatarUrl}
                    alt={userDetails.name}
                    sx={{ width: 150, height: 150, mb: 2 }}
                  />
                  {!isEditing && (
                    <IconButton
                      color="primary"
                      aria-label="upload picture"
                      component="label"
                      sx={{
                        position: 'absolute',
                        bottom: 10,
                        right: 10,
                        bgcolor: 'rgba(0,0,0,0.6)',
                        borderRadius: '50%',
                        '&:hover': {
                          bgcolor: 'rgba(0,0,0,0.8)',
                        },
                      }}
                    >
                      <input
                        hidden
                        accept="image/*"
                        type="file"
                        onChange={handleProfilePicChange}
                      />
                      <PhotoCameraIcon fontSize="small" sx={{ color: 'white' }} />
                    </IconButton>
                  )}
                </Box>
                <Typography variant="h5" color="primary">
                  {userDetails.name}
                </Typography>
                {!isEditing && (
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={() => setIsEditing(true)}
                    sx={{ mt: 2 }}
                  >
                    Update Profile
                  </Button>
                )}
              </Grid>

              {/* Detailed Information */}
              <Grid item xs={12} md={8}>
                {!isEditing ? (
                  <>
                    <Typography variant="h5" gutterBottom>
                      Personal Information
                    </Typography>
                    <Divider sx={{ mb: 2 }} />
                    <DetailItem label="Full Name" value={userDetails.name} />
                    <DetailItem label="Date of Birth" value={userDetails.dob} />
                    <DetailItem label="Mobile Number" value={userDetails.phone} />
                    <DetailItem label="Gender" value={userDetails.gender} />
                    <Typography variant="h5" gutterBottom sx={{ mt: 4 }}>
                      Account Details
                    </Typography>
                    <Divider sx={{ mb: 2 }} />
                    <DetailItem label="Email Address" value={userDetails.email} />
                    <DetailItem label="Last Login" value={userDetails.lastLogin} />
                    <DetailItem label="Registration Method" value={userDetails.regMethod} />

                    {/* Change Password Section */}
                    <Typography variant="h5" gutterBottom sx={{ mt: 4 }}>
                      Change Password
                    </Typography>
                    <Button
                      variant="outlined"
                      color="primary"
                      onClick={() => setIsChangingPassword(true)}
                    >
                      Change Password
                    </Button>
                  </>
                ) : (
                  <form onSubmit={handleSubmit}>
                    <Typography variant="h5" gutterBottom>
                      Edit Personal Information
                    </Typography>
                    <Divider sx={{ mb: 2 }} />
                    <Grid container spacing={2}>
                      <Grid item xs={12} sm={6}>
                        <TextField
                          label="Full Name"
                          variant="outlined"
                          fullWidth
                          name="name"
                          value={formValues.name}
                          onChange={handleChange}
                          required
                        />
                      </Grid>
                      <Grid item xs={12} sm={6}>
                        <TextField
                          label="Date of Birth"
                          variant="outlined"
                          fullWidth
                          name="dob"
                          value={formValues.dob}
                          onChange={handleChange}
                          type="date"
                          InputLabelProps={{ shrink: true }}
                          required
                        />
                      </Grid>
                      <Grid item xs={12} sm={6}>
                        <TextField
                          label="Mobile Number"
                          variant="outlined"
                          fullWidth
                          name="phone"
                          value={formValues.phone}
                          onChange={handleChange}
                          required
                          inputProps={{ maxLength: 13 }}
                        />
                      </Grid>
                      <Grid item xs={12} sm={6}>
                        <FormControl fullWidth>
                          <InputLabel>Gender</InputLabel>
                          <Select
                            name="gender"
                            value={formValues.gender}
                            onChange={handleChange}
                            label="Gender"
                            required
                          >
                            <MenuItem value="Male">Male</MenuItem>
                            <MenuItem value="Female">Female</MenuItem>
                            <MenuItem value="Other">Other</MenuItem>
                          </Select>
                        </FormControl>
                      </Grid>
                      <Grid item xs={12} sm={6}>
                        <TextField
                          label="Email Address"
                          variant="outlined"
                          fullWidth
                          name="email"
                          value={formValues.email}
                          onChange={handleChange}
                          required
                        />
                      </Grid>
                      <Grid item xs={12} sm={6}>
                        <TextField
                          label="Country"
                          variant="outlined"
                          fullWidth
                          name="address"
                          value={formValues.address}
                          onChange={handleChange}
                          required
                        />
                      </Grid>
                      <Grid item xs={12} sm={6}>
                        <FormControl fullWidth>
                          <InputLabel>State</InputLabel>
                          <Select
                            name="state"
                            value={formValues.state}
                            onChange={handleChange}
                            label="State"
                          >
                            <MenuItem value="State1">State1</MenuItem>
                            <MenuItem value="State2">State2</MenuItem>
                          </Select>
                        </FormControl>
                      </Grid>
                      <Grid item xs={12} sm={6}>
                        <TextField
                          label="City"
                          variant="outlined"
                          fullWidth
                          name="city"
                          value={formValues.city}
                          onChange={handleChange}
                          required
                        />
                      </Grid>
                      <Grid item xs={12} sm={6}>
                        <TextField
                          label="Zip Code"
                          variant="outlined"
                          fullWidth
                          name="zipCode"
                          value={formValues.zipCode}
                          onChange={handleChange}
                          required
                        />
                      </Grid>
                      <Grid item xs={12} sm={6}>
                        <TextField
                          label="Adhar No"
                          variant="outlined"
                          fullWidth
                          name="adharNo"
                          value={formValues.adharNo}
                          onChange={handleChange}
                          InputProps={{ readOnly: true }}
                        />
                      </Grid>
                      <Grid item xs={12} sm={6}>
                        <TextField
                          label="Pan No"
                          variant="outlined"
                          fullWidth
                          name="panNo"
                          value={formValues.panNo}
                          onChange={handleChange}
                          InputProps={{ readOnly: true }}
                        />
                      </Grid>
                      <Grid item xs={12} sm={6}>
                        <TextField
                          label="Bank Account No"
                          variant="outlined"
                          fullWidth
                          name="bankAccountNo"
                          value={formValues.bankAccountNo}
                          onChange={handleChange}
                          InputProps={{ readOnly: true }}
                        />
                      </Grid>
                    </Grid>
                    <Box display="flex" justifyContent="space-between" mt={3}>
                      <Button
                        variant="contained"
                        color="success"
                        type="submit"
                      >
                        Save
                      </Button>
                      <Button
                        variant="contained"
                        color="error"
                        onClick={() => setIsEditing(false)}
                      >
                        Cancel
                      </Button>
                    </Box>
                  </form>
                )}

                {/* Password Change Section */}
                {isChangingPassword && (
                  <form onSubmit={handlePasswordSubmit}>
                    <Typography variant="h6" gutterBottom>
                      Change Password
                    </Typography>
                    <Grid container spacing={2}>
                      <Grid item xs={12} sm={4}>
                        <TextField
                          label="Current Password"
                          variant="outlined"
                          fullWidth
                          name="currentPassword"
                          value={passwordForm.currentPassword}
                          onChange={handlePasswordChange}
                          type="password"
                          required
                        />
                      </Grid>
                      <Grid item xs={12} sm={4}>
                        <TextField
                          label="New Password"
                          variant="outlined"
                          fullWidth
                          name="newPassword"
                          value={passwordForm.newPassword}
                          onChange={handlePasswordChange}
                          type="password"
                          required
                        />
                      </Grid>
                      <Grid item xs={12} sm={4}>
                        <TextField
                          label="Confirm Password"
                          variant="outlined"
                          fullWidth
                          name="confirmPassword"
                          value={passwordForm.confirmPassword}
                          onChange={handlePasswordChange}
                          type="password"
                          required
                        />
                      </Grid>
                    </Grid>
                    <Box display="flex" justifyContent="space-between" mt={3}>
                      <Button
                        variant="contained"
                        color="success"
                        type="submit"
                      >
                        Change Password
                      </Button>
                      <Button
                        variant="contained"
                        color="error"
                        onClick={() => setIsChangingPassword(false)}
                      >
                        Cancel
                      </Button>
                    </Box>
                  </form>
                )}
              </Grid>
            </Grid>
          </Card>
        </Box>
      </Box>
    </Box>
  );
};

const DetailItem = ({ label, value }) => (
  <Box display="flex" justifyContent="space-between" mb={2}>
    <Typography variant="body1" color="textSecondary">{label}:</Typography>
    <Typography variant="body1">{value}</Typography>
  </Box>
);

export default UserProfile;