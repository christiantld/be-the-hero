import React from 'react';
import { Link, useHistory } from 'react-router-dom';
import { Form, Input } from '@rocketseat/unform';
import copy from 'copy-to-clipboard';
import * as Yup from 'yup';
import { FiArrowLeft } from 'react-icons/fi';
import { toast } from 'react-toastify';

import logo from '../../assets/logo.svg';
import api from '../../services/api';

import { Container, Content } from './styles';

const schema = Yup.object().shape({
  name: Yup.string().required('O nome da ONG é obrigatório'),
  email: Yup.string()
    .email('Insira um e-mail válido')
    .required('O e-mail é obrigatório para o contato com a sua ONG'),
  whatsapp: Yup.string().required(
    'O WhatsApp é obrigatório para o contato com a sua ONG'
  ),
  city: Yup.string().required('Campo obrigatório'),
  uf: Yup.string()
    .length(2, 'Digite apenas a sigla do seu estado')
    .required('Campo obrigatório'),
});

export default function Register() {
  const history = useHistory();

  async function handleRegister({ name, email, whatsapp, city, uf }) {
    const data = { name, email, whatsapp, city, uf };

    try {
      const response = await api.post('register', data);
      copy(response.data.id);

      toast.success(
        `ONG cadastrada com sucesso, seu ID ${response.data.id} foi copiado para o clipboard!`,
        { autoClose: 5000 }
      );

      history.push('/');
    } catch (error) {
      toast.error(`Erro no cadastro, tente novamente.`);
    }
  }
  return (
    <Container>
      <Content>
        <section className="form">
          <img src={logo} alt="Be the hero" />
          <h1>Cadastro</h1>
          <p>
            Faça seu cadastro, entre na plataforma e ajude pessoas a encontrarem
            casos da sua ONG
          </p>

          <Link className="back-link" to="/">
            <FiArrowLeft size={16} color="#e02041" />
            Fazer Logon
          </Link>
        </section>
        <Form schema={schema} onSubmit={handleRegister}>
          <Input name="name" type="text" placeholder="Nome da ONG" />
          <Input name="email" type="email" placeholder="E-mail" />
          <Input name="whatsapp" type="tel" placeholder="WhatsApp" />
          <div className="input-group">
            <Input name="city" type="text" placeholder="Cidade" />
            <Input
              name="uf"
              style={{ width: 75, textTransform: 'uppercase' }}
              type="text"
              placeholder="UF"
              maxLength="2"
            />
          </div>
          <button className="button" type="submit">
            Cadastrar
          </button>
        </Form>
      </Content>
    </Container>
  );
}
