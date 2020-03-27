import React, { useEffect, useState } from 'react';
import { FiTrash2, FiArrowRight, FiArrowLeft } from 'react-icons/fi';
import { toast } from 'react-toastify';
import Header from '../../components/Header';
import api from '../../services/api';
import { Container, PageActions } from './styles';

export default function Profile() {
  const ongId = localStorage.getItem('ongID');

  const [incidents, setIncidents] = useState([]);
  const [page, setPage] = useState(1);

  function handlePage(action) {
    action === 'back' ? setPage(page - 1) : setPage(page + 1);
  }

  async function handleDeleteIncident(id) {
    try {
      await api.delete(`/ong/incidents/${id}`, {
        headers: {
          Authorization: ongId,
        },
      });

      setIncidents(incidents.filter((incident) => incident.id !== id));
      toast.success('Caso deletado com sucesso');
    } catch (error) {
      toast.error('Erro ao deletar o caso, tente novamente');
    }
  }

  useEffect(() => {
    api
      .get('/ong/incidents', {
        headers: {
          Authorization: ongId,
        },
        params: {
          page,
        },
      })
      .then((response) => {
        setIncidents(response.data);
        console.log(incidents);
      });
  }, [ongId, page]);
  return (
    <Container>
      <Header />
      {incidents.length > 0 ? (
        <h1>Casos cadastrados</h1>
      ) : (
        <h1>Nenhum Caso Cadastrado</h1>
      )}
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
      <PageActions>
        <button
          type="button"
          disabled={page < 2}
          onClick={() => handlePage('back')}
        >
          <FiArrowLeft size={20} color="##41414d" />
        </button>
        <span>Página {page}</span>
        <button
          type="button"
          disabled={page > 2 && incidents.length === 0}
          onClick={() => handlePage('next')}
        >
          <FiArrowRight size={20} color="##41414d" />
        </button>
      </PageActions>
    </Container>
  );
}
