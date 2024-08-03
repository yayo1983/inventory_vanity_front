import React, { useState, useEffect } from 'react';
import { Container, Table, TableBody, TableCell, TableHead, TableRow, Button } from '@mui/material';
import api from '../services/api';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const EquipmentList = () => {
  const [equipment, setEquipment] = useState([]);

  useEffect(() => {
    fetchEquipment();
  }, []);

  const fetchEquipment = async () => {
    const response = await api.get('/equipments/');
    setEquipment(response.data);
  };

  const handleDelete = async (id) => {
    try {
      await api.delete(`/equipments/${id}/`);
      toast.success('Equipment added successfully!', {
        position: 'top-right'
      });
      fetchEquipment(); 
    } catch (error) {
      if (error.response) {

        console.error('Error:', error.response.data);
        console.error('Status:', error.response.status);
      } else if (error.request) {
        console.error('Error:', error.request);
      } else {
        console.error('Error:', error.message);
      }
      toast.error(`Error: ${error.response?.data?.message || 'No se pudo eliminar el equipo. Inténtalo de nuevo'}`, {
        position: 'bottom-left'
      });
    }
  };
  

  return (
    <Container>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Marca</TableCell>
            <TableCell>Modelo</TableCell>
            <TableCell>Fecha de Compra</TableCell>
            <TableCell>Proveedor</TableCell>
            <TableCell>Costo</TableCell>
            <TableCell>Acciones</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {equipment.map((item) => (
            <TableRow key={item.id}>
              <TableCell>{item.brand}</TableCell>
              <TableCell>{item.model}</TableCell>
              <TableCell>{item.purchase_date}</TableCell>
              <TableCell>{item.supplier}</TableCell>
              <TableCell>{item.cost}</TableCell>
              <TableCell>
                <Button onClick={() => handleDelete(item.id)}>Eliminar</Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Container>
  );
};

export default EquipmentList;
