import React, { useState } from 'react';
import { Box, Card, Typography, TextField, Button, Grid, Avatar, Divider } from '@mui/material';
import UserSidebar from './UserSidebar';
import Navbar from './Navbar';

const UserProfile = () => {
  // User details state
  const [userDetails, setUserDetails] = useState({
    name: 'John Doe',
    email: 'john.doe@example.com',
    phone: '+1 (123) 456-7890',
    address: '123 Main St, City, Country',
    bio: 'Software Engineer with a passion for building scalable web applications.',
    avatarUrl: 'https://via.placeholder.com/150',
  });

  // State to control the edit mode
  const [isEditing, setIsEditing] = useState(false);

  // Temporary form state for editing user details
  const [formValues, setFormValues] = useState(userDetails);

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValues({ ...formValues, [name]: value });
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    setUserDetails(formValues); // Save the changes
    setIsEditing(false); // Exit edit mode
  };

  return (
    <Box display="flex" minHeight="100vh" flexDirection="column">
    {/* Navbar Component */}
    <Navbar />

    <Box display="flex" flex={1}>
      {/* Sidebar */}
      <Box width="20%" minHeight="100vh">
        <UserSidebar />
      </Box>
      {/* Main Content */}
    <Box width="80%" p={4}>
      <Typography variant="h4" color="primary" gutterBottom>
        User Profile
      </Typography>

      <Card sx={{ p: 3, maxWidth: 500, margin: '0 auto', textAlign: 'center' }}>
        {/* Display profile details */}
        {!isEditing ? (
          <>
            <Avatar
              src={userDetails.avatarUrl}
              alt={userDetails.name}
              sx={{ width: 100, height: 100, marginBottom: 2, marginX: 'auto' }}
            />
            <Typography variant="h6" color="primary">
              {userDetails.name}
            </Typography>
            <Typography variant="body2" color="textSecondary" sx={{ mb: 2 }}>
              {userDetails.bio}
            </Typography>
            <DetailItem label="Email" value={userDetails.email} />
            <DetailItem label="Phone" value={userDetails.phone} />
            <DetailItem label="Address" value={userDetails.address} />
            
            <Button
              variant="contained"
              color="primary"
              onClick={() => setIsEditing(true)}
              sx={{ mt: 3 }}
            >
              Update Profile
            </Button>
          </>
        ) : (
          // Editable form for updating user details
          <form onSubmit={handleSubmit}>
            <TextField
              label="Name"
              variant="outlined"
              fullWidth
              name="name"
              value={formValues.name}
              onChange={handleChange}
              sx={{ mb: 2 }}
              required
            />
            <TextField
              label="Email"
              variant="outlined"
              fullWidth
              name="email"
              value={formValues.email}
              onChange={handleChange}
              sx={{ mb: 2 }}
              required
            />
            <TextField
              label="Phone"
              variant="outlined"
              fullWidth
              name="phone"
              value={formValues.phone}
              onChange={handleChange}
              sx={{ mb: 2 }}
              required
            />
            <TextField
              label="Address"
              variant="outlined"
              fullWidth
              name="address"
              value={formValues.address}
              onChange={handleChange}
              sx={{ mb: 2 }}
              required
            />
            <TextField
              label="Bio"
              variant="outlined"
              fullWidth
              name="bio"
              value={formValues.bio}
              onChange={handleChange}
              multiline
              rows={3}
              sx={{ mb: 3 }}
              required
            />
            <Grid container spacing={2}>
              <Grid item>
                <Button variant="contained" color="success" type="submit">
                  Save Changes
                </Button>
              </Grid>
              <Grid item>
                <Button
                  variant="contained"
                  color="secondary"
                  onClick={() => setIsEditing(false)}
                >
                  Cancel
                </Button>
              </Grid>
            </Grid>
          </form>
        )}
      </Card>
    </Box>
    </Box>
    </Box>
  );
};

// Reusable detail item component
const DetailItem = ({ label, value }) => (
  <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
    <Typography variant="body1" color="textSecondary" sx={{ fontWeight: 'bold' }}>
      {label}:
    </Typography>
    <Typography variant="body1">{value}</Typography>
  </Box>
);

export default UserProfile;
