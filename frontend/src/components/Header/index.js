import React from 'react';
import { Link, useHistory } from 'react-router-dom';
import { FiPower } from 'react-icons/fi';
import logo from '../../assets/logo.svg';
import { Container } from './styles';

export default function Header() {
  const ongName = localStorage.getItem('ongName');
  const history = useHistory();

  function handleLogOut() {
    localStorage.clear();
    history.push('/');
  }

  return (
    <Container>
      <header>
        <nav>
          <Link to="/profile">
            <img src={logo} alt="be the hero" />
          </Link>

          <span>Bem Vinda, {ongName}</span>
        </nav>
        <aside>
          <Link className="button" to="/incidents/new">
            Cadastrar novo caso
          </Link>
          <button onClick={handleLogOut} type="button">
            <FiPower size={18} color="#e02041" />
          </button>
        </aside>
      </header>
    </Container>
  );
}
