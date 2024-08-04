import React, { useState, useContext } from 'react';
import { Container, TextField, Button } from '@mui/material';
import api from '../services/api';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { SharedContext } from '../SharedContext';

const EquipmentForm = () => {
  const { sharedVariable, setSharedVariable } = useContext(SharedContext);
  const [formData, setFormData] = useState({
    brand: '',
    model: '',
    purchase_date: '',
    supplier: '',
    cost: '',
  });

  const fetchEquipment = async () => {
    const response = await api.get('/equipments/');
    setSharedVariable(response.data);
    console.log("valor de sharedVariable: "+sharedVariable)
  };


  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await api.post('/equipments/', formData);

      toast.success('Equipment added successfully!', {
        position: 'top-right',
      });

      fetchEquipment();
    } catch (error) {
      toast.error(
        `Error: ${
          error.response?.data?.message || 'An unexpected error occurred'
        }`,
        {
          position: 'bottom-left',
        },
      );

      console.error('Error while submitting the form:', error);
    }
  };

  return (
    <Container>
      <form onSubmit={handleSubmit}>
        <TextField
          name="brand"
          label="Marca"
          value={formData.brand}
          onChange={handleChange}
          fullWidth
          margin="normal"
        />
        <TextField
          name="model"
          label="Modelo"
          value={formData.model}
          onChange={handleChange}
          fullWidth
          margin="normal"
        />
        <TextField
          name="purchase_date"
          label="Fecha de Compra"
          type="date"
          value={formData.purchase_date}
          onChange={handleChange}
          fullWidth
          margin="normal"
          InputLabelProps={{
            shrink: true,
          }}
        />
        <TextField
          name="supplier"
          label="Proveedor"
          value={formData.supplier}
          onChange={handleChange}
          fullWidth
          margin="normal"
        />
        <TextField
          name="cost"
          label="Costo"
          type="number"
          value={formData.cost}
          onChange={handleChange}
          fullWidth
          margin="normal"
        />
        <Button type="submit" variant="contained" color="primary">
          Agregar Equipo
        </Button>
      </form>
    </Container>
  );
};

export default EquipmentForm;
