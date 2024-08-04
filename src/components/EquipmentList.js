import React, { useState, useEffect, useContext, useCallback } from 'react';
import {
  Container,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Button,
  Modal,
  Box,
  TextField,
} from '@mui/material';
import api from '../services/api';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { SharedContext } from '../SharedContext';

const EquipmentList = () => {
  const [equipment, setEquipment] = useState([]);
  const { sharedVariable, setSharedVariable } = useContext(SharedContext);
  const [open, setOpen] = useState(false);
  const [selectedEquipmentId, setSelectedEquipmentId] = useState(null);
  const [newDepartmentId, setNewDepartmentId] = useState('');
  const [newUserId, setNewUserId] = useState('');

  const fetchEquipment = useCallback(async () => {
    try {
      const response = await api.get('/equipments/');
      setEquipment(response.data);
      setSharedVariable(response.data);
    } catch (error) {
      console.error('Error fetching equipment:', error);
    }
  }, [setSharedVariable]);

  useEffect(() => {
    fetchEquipment();
  }, [fetchEquipment]);

  const handleDelete = async (id) => {
    try {
      await api.delete(`/equipments/${id}/`);
      toast.success('Equipment deleted successfully!', {
        position: 'top-right',
      });
      fetchEquipment();
    } catch (error) {
      console.error('Error:', error.response?.data || error.message);
      toast.error(
        `Error: ${
          error.response?.data?.message ||
          'No se pudo eliminar el equipo. Inténtalo de nuevo'
        }`,
        {
          position: 'bottom-left',
        },
      );
    }
  };

  const handleReassign = async () => {
    try {
      await api.put(`/equipments/${selectedEquipmentId}/reassign/`, {
        department_id: newDepartmentId,
        user_id: newUserId,
      });
      toast.success('Equipment reassigned successfully!', {
        position: 'top-right',
      });
      fetchEquipment();
      handleClose();
    } catch (error) {
      console.error('Error:', error.response?.data || error.message);
      toast.error(
        `Error: ${
          error.response?.data?.message ||
          'No se pudo reasignar el equipo. Inténtalo de nuevo'
        }`,
        {
          position: 'bottom-left',
        },
      );
    }
  };

  const handleDeactivate = async (id) => {
    try {
      await api.put(`/equipments/${id}/deactivate/`);
      toast.success('Equipment deactivated successfully!', {
        position: 'top-right',
      });
      fetchEquipment();
    } catch (error) {
      console.error('Error:', error.response?.data || error.message);
      toast.error(
        `Error: ${
          error.response?.data?.message ||
          'No se pudo dar de baja el equipo. Inténtalo de nuevo'
        }`,
        {
          position: 'bottom-left',
        },
      );
    }
  };

  const handleActivate = async (id) => {
    try {
      await api.put(`/equipments/${id}/activate/`);
      toast.success('Equipment activated successfully!', {
        position: 'top-right',
      });
      fetchEquipment();
    } catch (error) {
      console.error('Error:', error.response?.data || error.message);
      toast.error(
        `Error: ${
          error.response?.data?.message ||
          'No se pudo dar de alta el equipo. Inténtalo de nuevo'
        }`,
        {
          position: 'bottom-left',
        },
      );
    }
  };

  const handleOpen = (id) => {
    setSelectedEquipmentId(id);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setNewDepartmentId('');
    setNewUserId('');
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
            <TableCell>Estado</TableCell>
            <TableCell>Usuario</TableCell>
            <TableCell>Acciones</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {Array.isArray(sharedVariable) && sharedVariable.length > 0 ? (
            sharedVariable.map((item) => (
              <TableRow key={item.id}>
                <TableCell>{item.brand}</TableCell>
                <TableCell>{item.model}</TableCell>
                <TableCell>{item.purchase_date}</TableCell>
                <TableCell>{item.supplier}</TableCell>
                <TableCell>{item.cost}</TableCell>
                <TableCell>{item.active? "Alta":"Baja"}</TableCell>
                <TableCell>{item.user? item.user:"Sin usuario"}</TableCell>
                <TableCell>
                  <Button onClick={() => handleDelete(item.id)}>
                    Eliminar
                  </Button>
                  <Button onClick={() => handleOpen(item.id)}>Reasignar</Button>
                  <Button onClick={() => handleDeactivate(item.id)}>
                    Dar de Baja
                  </Button>
                  <Button onClick={() => handleActivate(item.id)}>
                    Dar de Alta
                  </Button>
                </TableCell>
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={6}>No hay datos para mostrar</TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
      <Modal open={open} onClose={handleClose}>
        <Box
          sx={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            bgcolor: 'background.paper',
            boxShadow: 24,
            p: 4,
          }}
        >
          <h2>Reasignar Equipo</h2>
          <TextField
            label="Nuevo Departamento ID"
            value={newDepartmentId}
            onChange={(e) => setNewDepartmentId(e.target.value)}
            fullWidth
            margin="normal"
          />
          <TextField
            label="Nuevo Usuario ID"
            value={newUserId}
            onChange={(e) => setNewUserId(e.target.value)}
            fullWidth
            margin="normal"
          />
          <Button onClick={handleReassign} color="primary" variant="contained">
            Reasignar
          </Button>
          <Button onClick={handleClose} color="secondary" variant="contained">
            Cancelar
          </Button>
        </Box>
      </Modal>
    </Container>
  );
};

export default EquipmentList;
