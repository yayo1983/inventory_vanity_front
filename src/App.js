import React from 'react';
import { Container, Typography } from '@mui/material';
import EquipmentList from './components/EquipmentList';
import EquipmentForm from './components/EquipmentForm';
import { ToastContainer } from 'react-toastify';

const App = () => {
  return (
    <Container>
      <Typography variant="h4" gutterBottom>
        Control de Inventarios
      </Typography>
      <EquipmentForm />
      <EquipmentList />
      <ToastContainer />
    </Container>
  );
};

export default App;
