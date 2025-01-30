import React, { useState } from 'react';
import { Box, Card, Typography, TextField, Button, Grid, InputLabel, FormHelperText, CircularProgress } from '@mui/material';
import { useDropzone } from 'react-dropzone';
import UserSidebar from './UserSidebar';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Navbar from './Navbar';

const FileUpload = ({ label, file, onDrop, loading, error, helperText }) => {
  const { getRootProps, getInputProps } = useDropzone({
    accept: '.pdf,.doc,.docx,.jpg,.jpeg,.png',
    onDrop,
  });

  return (
    <Box>
      <InputLabel>{label}</InputLabel>
      <Box
        {...getRootProps()}
        sx={{
          border: '1px dashed #ccc',
          borderRadius: 1,
          padding: 2,
          textAlign: 'center',
          cursor: 'pointer',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          minHeight: '120px',
          transition: 'background-color 0.3s ease',
          '&:hover': { backgroundColor: '#f1f1f1' },
        }}
      >
        <input {...getInputProps()} style={{ display: 'none' }} />
        <Typography variant="body2" color="textSecondary" sx={{ mb: 1 }}>
          {file ? `${file.name} uploaded` : `Drag & drop or click to select`}
        </Typography>
        {loading ? <CircularProgress size={24} /> : null}
      </Box>
      {error && <FormHelperText error>{helperText}</FormHelperText>}
    </Box>
  );
};

const KYCForm = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    flatNo: '',
    street: '',
    city: '',
    state: '',
    country: '',
    zipcode: '',
    panNumber: '',
    panCardImage: null,
    incomeProof: null,
  });

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [loadingPan, setLoadingPan] = useState(false);
  const [loadingIncome, setLoadingIncome] = useState(false);

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    const newErrors = {};
    if (!formData.firstName) newErrors.firstName = 'First Name is required';
    if (!formData.lastName) newErrors.lastName = 'Last Name is required';
    if (!formData.flatNo || !formData.street || !formData.city || !formData.state || !formData.country || !formData.zipcode) {
      newErrors.address = 'Complete address is required';
    }
    if (!formData.panNumber || formData.panNumber.length !== 10) newErrors.panNumber = 'Valid PAN number is required';
    if (!formData.panCardImage) newErrors.panCardImage = 'PAN card image is required';
    if (!formData.incomeProof) newErrors.incomeProof = 'Income proof is required';

    setErrors(newErrors);

    if (Object.keys(newErrors).length === 0) {
      // Simulate API call
      setTimeout(() => {
        setIsSubmitting(false);
        toast.success('KYC Submitted Successfully!');

        // Clear form fields after successful submission
        setFormData({
          firstName: '',
          lastName: '',
          flatNo: '',
          street: '',
          city: '',
          state: '',
          country: '',
          zipcode: '',
          panNumber: '',
          panCardImage: null,
          incomeProof: null,
        });
        setErrors({}); // Clear errors
      }, 2000);
    } else {
      setIsSubmitting(false);
      toast.error('Please fix the errors and try again.');
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handlePANCardDrop = (acceptedFiles) => {
    setLoadingPan(true);
    setFormData({ ...formData, panCardImage: acceptedFiles[0] });

    // Simulate file upload process
    setTimeout(() => {
      setLoadingPan(false);
    }, 2000); // Simulating file upload time
  };

  const handleIncomeProofDrop = (acceptedFiles) => {
    setLoadingIncome(true);
    setFormData({ ...formData, incomeProof: acceptedFiles[0] });

    // Simulate file upload process
    setTimeout(() => {
      setLoadingIncome(false);
    }, 2000); // Simulating file upload time
  };

  const handleReset = () => {
    // Reset the form data to initial empty state
    setFormData({
      firstName: '',
      lastName: '',
      flatNo: '',
      street: '',
      city: '',
      state: '',
      country: '',
      zipcode: '',
      panNumber: '',
      panCardImage: null,
      incomeProof: null,
    });
    setErrors({});
    setLoadingPan(false);
    setLoadingIncome(false);
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
        <Card sx={{ p: 3, maxWidth: 900, margin: '0 auto' }}>
          <Typography variant="h5" gutterBottom>
            KYC Form
          </Typography>

          <form onSubmit={handleSubmit}>
            {/* Full Name Section */}
            <Grid container spacing={2} sx={{ mb: 3 }}>
              <Grid item xs={12} sm={6}>
                <TextField
                  label="First Name"
                  variant="outlined"
                  fullWidth
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleChange}
                  error={!!errors.firstName}
                  helperText={errors.firstName}
                  required
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  label="Last Name"
                  variant="outlined"
                  fullWidth
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleChange}
                  error={!!errors.lastName}
                  helperText={errors.lastName}
                  required
                />
              </Grid>
            </Grid>

            {/* Address Section */}
            <Typography variant="h5" sx={{ mt: 3 }}>
              Address Details
            </Typography>
            <Grid container spacing={2} sx={{ mb: 3 }}>
              <Grid item xs={12} sm={4}>
                <TextField
                  label="Flat/House No."
                  variant="outlined"
                  fullWidth
                  name="flatNo"
                  value={formData.flatNo}
                  onChange={handleChange}
                  error={!!errors.address}
                  helperText={errors.address && !formData.flatNo && 'Flat/House No. is required'}
                  required
                />
              </Grid>
              <Grid item xs={12} sm={4}>
                <TextField
                  label="Street"
                  variant="outlined"
                  fullWidth
                  name="street"
                  value={formData.street}
                  onChange={handleChange}
                  error={!!errors.address}
                  helperText={errors.address && !formData.street && 'Street is required'}
                  required
                />
              </Grid>
              <Grid item xs={12} sm={4}>
                <TextField
                  label="City"
                  variant="outlined"
                  fullWidth
                  name="city"
                  value={formData.city}
                  onChange={handleChange}
                  error={!!errors.address}
                  helperText={errors.address && !formData.city && 'City is required'}
                  required
                />
              </Grid>
            </Grid>
            <Grid container spacing={2} sx={{ mb: 3 }}>
              <Grid item xs={12} sm={4}>
                <TextField
                  label="State"
                  variant="outlined"
                  fullWidth
                  name="state"
                  value={formData.state}
                  onChange={handleChange}
                  error={!!errors.address}
                  helperText={errors.address && !formData.state && 'State is required'}
                  required
                />
              </Grid>
              <Grid item xs={12} sm={4}>
                <TextField
                  label="Country"
                  variant="outlined"
                  fullWidth
                  name="country"
                  value={formData.country}
                  onChange={handleChange}
                  error={!!errors.address}
                  helperText={errors.address && !formData.country && 'Country is required'}
                  required
                />
              </Grid>
              <Grid item xs={12} sm={4}>
                <TextField
                  label="Zipcode"
                  variant="outlined"
                  fullWidth
                  name="zipcode"
                  value={formData.zipcode}
                  onChange={handleChange}
                  error={!!errors.address}
                  helperText={errors.address && !formData.zipcode && 'Zipcode is required'}
                  required
                />
              </Grid>
            </Grid>

            {/* PAN Number and PAN Proof Section */}
            <Grid container spacing={2} sx={{ mb: 3 }}>
              <Grid item xs={12} sm={6}>
                <TextField
                  label="PAN Number"
                  variant="outlined"
                  fullWidth
                  name="panNumber"
                  value={formData.panNumber}
                  onChange={handleChange}
                  error={!!errors.panNumber}
                  helperText={errors.panNumber}
                  required
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <FileUpload
                  label="Upload PAN Card"
                  file={formData.panCardImage}
                  onDrop={handlePANCardDrop}
                  loading={loadingPan}
                  error={!!errors.panCardImage}
                  helperText={errors.panCardImage}
                />
              </Grid>
            </Grid>

            {/* Income Proof Section */}
            <Grid container spacing={2} sx={{ mb: 3 }}>
              <Grid item xs={12} sm={6}>
                <Typography variant="h6" color="primary" sx={{ mt: 3 }}>
                  Income Proof
                </Typography>
              </Grid>
              <Grid item xs={12} sm={6}>
                <FileUpload
                  label="Upload Income Proof"
                  file={formData.incomeProof}
                  onDrop={handleIncomeProofDrop}
                  loading={loadingIncome}
                  error={!!errors.incomeProof}
                  helperText={errors.incomeProof}
                />
              </Grid>
            </Grid>

            {/* Submit Button */}
            <Grid container spacing={2} sx={{ mt: 3 }}>
              <Grid item>
                <Button variant="contained" color="primary" type="submit" disabled={isSubmitting}>
                  {isSubmitting ? 'Submitting...' : 'Submit KYC'}
                </Button>
              </Grid>
              <Grid item>
                <Button variant="contained" color="secondary" onClick={handleReset}>
                  Reset
                </Button>
              </Grid>
            </Grid>
          </form>
        </Card>
      </Box>
    </Box>
    </Box>
  );
};

export default KYCForm;
