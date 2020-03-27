import React from 'react';
import { Link, useHistory } from 'react-router-dom';
import { Form, Input } from '@rocketseat/unform';
import * as Yup from 'yup';
import { FiLogIn } from 'react-icons/fi';
import { toast } from 'react-toastify';
import api from '../../services/api';
import { Container } from './styles';
import logo from '../../assets/logo.svg';
import heroesImg from '../../assets/heroes.png';

const schema = Yup.object().shape({
  id: Yup.string()
    .required('O logon é obrigatório ')
    .length(8, 'O Logon deve ter 8 caracteres'),
});

export default function Logon() {
  const history = useHistory();
  async function handleLogin({ id }) {
    try {
      const response = await api.post('session', { id });

      localStorage.setItem('ongID', id);
      localStorage.setItem('ongName', response.data.name);
      history.push('/profile');
    } catch (error) {
      toast.error('Erro ao efetuar login, tente novamente');
    }
  }
  return (
    <Container>
      <section className="form">
        <img src={logo} alt="Be the hero" />

        <Form schema={schema} onSubmit={handleLogin}>
          <h1>Faça seu Logon</h1>
          <Input name="id" type="text" placeholder="Seu Logon" />

          <button className="button" type="submit">
            Entrar
          </button>
          <Link className="back-link" to="/register">
            <FiLogIn size={16} color="#e02041" />
            Criar contar gratuita
          </Link>
        </Form>
      </section>
      <img src={heroesImg} alt="Heroes" />
    </Container>
  );
}
