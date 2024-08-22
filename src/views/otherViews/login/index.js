import React, { useEffect } from "react";
import { Table } from "react-bootstrap";
import mstarIcon from "../../../assets/logo/mstar-logo.png";
import { useState } from "react";
import AuthService from "../../../services/auth";
import { Link } from "react-router-dom";
import "./index.css";

export default function Login() {
  const authService = new AuthService();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  useEffect(() => {
    const token = localStorage.getItem("access_token");
    if (token) {
      window.location.href = "/";
    }
  })

  const toggleEmail = (e) => {
    setEmail(e.target.value);
  };

  const togglePassword = (e) => {
    setPassword(e.target.value);
  };

  const toggleLogin = async () => {
    const data = {
      email: email,
      password: password,
    };
    const response = await authService.login(data);
    if (response.status === 200) {
      localStorage.setItem("access_token", response.data.access_token);
      localStorage.setItem("refresh_token", response.data.refresh_token);
      window.location.href = "/";
    } else {
      alert("Usuário ou senha inválidos");
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
                placeholder="Enter email"
              />
              <label>Senha:</label>
              <input
                id="password"
                type="password"
                onChange={togglePassword}
                value={password}
                className="form-control "
                placeholder="Enter password"
              />
              <button
                onClick={() => toggleLogin()}
                type="submit"
                className="btn btn-primary mt-3 btn-login"
              >
                Entrar
              </button>
              
              <Link to={"/register"} className="link-register-ref">
                <span  className="link-register">Não possui uma conta? Registre-se aqui.</span>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
