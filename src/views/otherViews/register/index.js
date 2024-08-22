import React from "react";
import { Table } from "react-bootstrap";
import mstarIcon from "../../../assets/logo/mstar-logo.png";
import { useState } from "react";
import AuthService from "../../../services/auth";
import "./index.css";

export default function Register() {
  const authService = new AuthService();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [primeiroNome, setPrimeiroNome] = useState("");
  const [ultimoNome, setUltimoNome] = useState("");

  const toggleEmail = (e) => {
    setEmail(e.target.value);
  };

  const togglePrimeiroNome = (e) => {
    setPrimeiroNome(e.target.value);
  };

  const toggleUltimoNome = (e) => {
    setUltimoNome(e.target.value);
  };

  const togglePassword = (e) => {
    setPassword(e.target.value);
  };

  const toggleRegister = async () => {
    const data = {
      email: email,
      password: password,
      primeiro_nome: primeiroNome,
      ultimo_nome: ultimoNome,
    };
    const response = await authService.register(data);
    if (response.status === 200) {
      window.alert("Usuário registrado com sucesso");
      window.location.href = "/login";
    } else {
      alert("Ocorreu um erro");
    }
  };

  return (
    <>
      <div className="login-main">
        <div className="container-login">
          <div className="form-login">
            <img className="logo-login" src={mstarIcon}></img>
            <div className="form-group">
              <label>Email:</label>
              <input
                type="email"
                value={email}
                onChange={toggleEmail}
                className="form-control"
                placeholder="Digite o email"
              />
              <label>Senha:</label>
              <input
                id="senha"
                type="password"
                onChange={togglePassword}
                value={password}
                className="form-control "
                placeholder="Digite a senha"
              />
              <label>Primeiro nome:</label>
              <input
                id="primeiro-nome"
                type="text"
                onChange={togglePrimeiroNome}
                value={primeiroNome}
                className="form-control "
                placeholder="Digite o primeiro nome"
              />
              <label>Ultimo nome:</label>
              <input
                id="segundo-nome"
                type="text"
                onChange={toggleUltimoNome}
                value={ultimoNome}
                className="form-control "
                placeholder="Digite o segundo nome"
              />
              <button
                onClick={() => toggleRegister()}
                type="submit"
                className="btn btn-primary mt-3 btn-login"
              >
                Registrar
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
