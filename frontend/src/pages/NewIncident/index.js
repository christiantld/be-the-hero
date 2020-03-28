import React, { useState } from 'react';
import { toast } from 'react-toastify';
import { Link, useHistory } from 'react-router-dom';
import { Form, Input } from '@rocketseat/unform';
import * as Yup from 'yup';
import { FiArrowLeft } from 'react-icons/fi';
import api from '../../services/api';
import Header from '../../components/Header';
import logo from '../../assets/logo.svg';
import { Container, Content, BoxContent } from './styles';

const schema = Yup.object().shape({
  title: Yup.string().required('Campo obrigatório'),
  value: Yup.string().required('Campo obrigatório'),
});

export default function NewIncident() {
  const history = useHistory();
  const [description, setDescription] = useState('');

  async function handleSubmit({ title, value }) {
    const data = { title, description, value };
    const token = localStorage.getItem('tokenHero');

    try {
      await api.post('/ong/incidents', data, {
        headers: {
          Authorization: token,
        },
      });

      history.push('/profile');
    } catch (error) {
      toast.error('Caso deletado com sucesso');
    }
  }
  return (
    <Container>
      <Header showIncidentButton="hidden" />
      <Content>
        <BoxContent>
          <section className="form">
            <img src={logo} alt="Be the hero" />
            <h1>Cadastrar novo caso</h1>
            <p>
              Descreva o caso detalhadamente para encontrar um heroi para
              resolve-lo
            </p>

            <Link className="back-link" to="/profile">
              <FiArrowLeft size={16} color="#e02041" />
              Voltar para home
            </Link>
          </section>
          <Form schema={schema} onSubmit={handleSubmit}>
            <Input name="title" type="text" placeholder="Titulo do caso" />
            <textarea
              maxLength="400"
              name="description"
              placeholder="Descricao"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
            <Input name="value" type="text" placeholder="Valor em Reais" />

            <button className="button" type="submit">
              Cadastrar
            </button>
          </Form>
        </BoxContent>
      </Content>
    </Container>
  );
}
