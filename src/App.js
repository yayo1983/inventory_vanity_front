import React from 'react';
import { Typography } from '@mui/material';
import EquipmentList from './components/EquipmentList';
import EquipmentForm from './components/EquipmentForm';
import { ToastContainer } from 'react-toastify';
import Layout from './components/Layout';

const App = () => {
  return (
    <Layout>
      <Typography variant="h4" gutterBottom>
        Control de Inventarios
      </Typography>
      <EquipmentForm />
      <EquipmentList />
      <ToastContainer />
    </Layout>
  );
};

export default App;
