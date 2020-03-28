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
    .required('O login é obrigatório ')
    .length(8, 'O Login deve ter 8 caracteres'),
  password: Yup.string()
    .required()
    .min(6, 'A senha deve possuir no minimo 6 caracteres'),
});

export default function Logon() {
  const history = useHistory();

  async function handleLogin({ id, password }) {
    const data = { id, password };
    try {
      const response = await api.post('session', data);

      localStorage.setItem('ongID', id);
      localStorage.setItem('tokenHero', response.data.token);
      localStorage.setItem('ongName', response.data.ong.name);
      history.push('/profile');
    } catch (error) {
      console.log(error);
      toast.error('Erro ao efetuar login, tente novamente');
    }
  }
  return (
    <Container>
      <section className="form">
        <img src={logo} alt="Be the hero" />

        <Form schema={schema} onSubmit={handleLogin}>
          <h1>Faça seu Login</h1>
          <Input name="id" type="text" placeholder="Login" />
          <Input name="password" type="password" placeholder="Senha" />

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
