import React, { useEffect, useState } from 'react';
import { FiTrash2 } from 'react-icons/fi';
import Header from '../../components/Header';
import api from '../../services/api';
import { Container } from './styles';

export default function Profile() {
  const ongId = localStorage.getItem('ongID');

  const [incidents, setIncidents] = useState([]);

  async function handleDeleteIncident(id) {
    try {
      await api.delete(`/ong/incidents/${id}`, {
        headers: {
          Authorization: ongId,
        },
      });

      setIncidents(incidents.filter((incident) => incident.id !== id));
    } catch (error) {
      alert('Erro ao deletar o caso, tente novamente');
    }
  }

  useEffect(() => {
    api
      .get('/ong/incidents', {
        headers: {
          Authorization: ongId,
        },
      })
      .then((response) => {
        setIncidents(response.data);
      });
  }, [ongId]);
  return (
    <Container>
      <Header />
      <h1>Casos Cadastrados</h1>
      <ul>
        {incidents.map((incident) => (
          <li key={incident.id}>
            <strong>Caso:</strong>
            <p>{incident.title}</p>

            <strong>Descricao:</strong>
            <p>{incident.description}</p>

            <strong>Valor</strong>
            <p>
              {Intl.NumberFormat('pt-BR', {
                style: 'currency',
                currency: 'BRL',
              }).format(incident.value)}
            </p>

            <button
              onClick={() => handleDeleteIncident(incident.id)}
              type="button"
            >
              <FiTrash2 size={20} color="#a8a8b3" />
            </button>
          </li>
        ))}
      </ul>
    </Container>
  );
}
