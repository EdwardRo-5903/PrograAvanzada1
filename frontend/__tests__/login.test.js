import { render, screen, fireEvent } from '@testing-library/react';
import Login from '../pages/login';
import axios from 'axios';
import { useRouter } from 'next/router';

jest.mock('axios'); // Mock de Axios para evitar llamadas reales a la API
jest.mock('next/router', () => ({
  useRouter: jest.fn(),
}));

describe('Login Page', () => {
  it('renders the login form', () => {
    render(<Login />);
    expect(screen.getByText('Iniciar Sesión')).toBeInTheDocument();
    expect(screen.getByLabelText('Nombre de Usuario')).toBeInTheDocument();
    expect(screen.getByLabelText('Contraseña')).toBeInTheDocument();
  });

  it('shows an error message for invalid credentials', async () => {
    axios.post.mockRejectedValueOnce({
      response: { data: { message: 'Credenciales inválidas' } },
    });

    render(<Login />);
    fireEvent.change(screen.getByLabelText('Nombre de Usuario'), {
      target: { value: 'usuario_invalido' },
    });
    fireEvent.change(screen.getByLabelText('Contraseña'), {
      target: { value: 'contraseña_invalida' },
    });
    fireEvent.click(screen.getByText('Iniciar Sesión'));

    const errorMessage = await screen.findByText('Credenciales inválidas');
    expect(errorMessage).toBeInTheDocument();
  });

  it('redirects to the home page on successful login', async () => {
    const pushMock = jest.fn();
    useRouter.mockReturnValue({ push: pushMock });

    axios.post.mockResolvedValueOnce({
      data: { token: 'mocked_token' },
    });

    render(<Login />);
    fireEvent.change(screen.getByLabelText('Nombre de Usuario'), {
      target: { value: 'usuario_valido' },
    });
    fireEvent.change(screen.getByLabelText('Contraseña'), {
      target: { value: 'contraseña_valida' },
    });
    fireEvent.click(screen.getByText('Iniciar Sesión'));

    expect(await screen.findByText('Iniciar Sesión')).toBeInTheDocument();
    expect(pushMock).toHaveBeenCalledWith('/');
  });
});