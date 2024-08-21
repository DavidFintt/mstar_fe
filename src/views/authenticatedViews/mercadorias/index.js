import React from "react";
import { Table } from "react-bootstrap";
import { useState, useEffect } from "react";
import "./index.css";
import MercadoriaService from "../../../services/mercadorias";

export default function Dashboard() {
  const mercadoriaService = new MercadoriaService();

  const [cadMercadorias, setCadMercadorias] = useState(false);
  const [consMercadorias, setConsMercadorias] = useState(false);
  const [tipoMercadoria, setTipoMercadoria] = useState(false);
  const [searchMercadoriaValue, setSearchMercadoriaValue] = useState("");
  const [mercadoriaDataCopy, setMercadoriaDataCopy] = useState([]);
  const [mercadoriaData, setMercadoriaData] = useState({
    nome: "",
    descricao: "",
    fabricante: "",
    tipo: "",
  });

  const [tipoMercadoriaLoad, setTipoMercadoriaLoad] = useState([]);
  const [mercadoriaLoad, setMercadoriaLoad] = useState([]);

  const [tipoMercadoriaData, setTipoMercadoriaData] = useState({
    nome: "",
    descricao: "",
  });

  useEffect(() => {
    loadTipoMercadoria();
    loadMercadorias();
  }, []);

  const loadTipoMercadoria = async () => {
    try {
      const response = await mercadoriaService.tipoMercadoriaLoad();
      setTipoMercadoriaLoad(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const loadMercadorias = async () => {
    try {
      const response = await mercadoriaService.mercadoriaLoad();
      setMercadoriaLoad(response.data);
      setMercadoriaDataCopy(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const toggleCadMercadorias = (e) => {
    let value = parseInt(e.target.value);
    if (value !== 0) {
      if (value === 1) {
        setCadMercadorias(true);
        setConsMercadorias(false);
        setTipoMercadoria(false);
      } else if (value === 2) {
        setCadMercadorias(false);
        setConsMercadorias(true);
        setTipoMercadoria(false);
      } else {
        setCadMercadorias(false);
        setConsMercadorias(false);
        setTipoMercadoria(true);
      }
      return;
    }
    setCadMercadorias(false);
    setConsMercadorias(false);
    setTipoMercadoria(false);
  };

  const toggleRegisterTipoMercadoria = async () => {
    try {
      if (
        tipoMercadoriaData.nome === "" ||
        tipoMercadoriaData.descricao === ""
      ) {
        window.confirm("Preencha todos os campos");
        return;
      }
      if (
        tipoMercadoriaData.nome.length > 50 ||
        tipoMercadoriaData.descricao.length > 100
      ) {
        window.confirm(
          "O nome do tipo deve possuir apenas 50 caracteres, e a descrição 100 caracteres"
        );
        return;
      }
      const response = await mercadoriaService.tipoMercadoriaRegister(
        tipoMercadoriaData
      );
    } catch (error) {
      console.log(error);
    }
  };

  const searchMercadoria = async () => {
    try {
      if (searchMercadoriaValue !== "") {
        let mercadoriaResult = mercadoriaLoad.filter(
          (el) =>
            el.nome === searchMercadoriaValue ||
            el.numero_registro === parseInt(searchMercadoriaValue)
        );

        setMercadoriaLoad(mercadoriaResult);
        return;
      } else {
        setMercadoriaLoad(mercadoriaDataCopy);
        return;
      }
    } catch (error) {
      console.log(error);
    }
  };

  const toggleRegisterMercadoria = async () => {
    try {
      if (
        mercadoriaData.nome === "" ||
        mercadoriaData.descricao === "" ||
        mercadoriaData.fabricante === "" ||
        mercadoriaData.tipo === ""
      ) {
        window.confirm("Preencha todos os campos");
        return;
      }
      if (
        mercadoriaData.nome.length > 50 ||
        mercadoriaData.descricao.length > 100 ||
        mercadoriaData.fabricante.length > 50
      ) {
        window.confirm(
          "O nome da mercadoria deve possuir apenas 50 caracteres, a descrição 100 caracteres e o fabricante 50 caracteres"
        );
        return;
      }
      const response = await mercadoriaService.mercadoriaRegister(
        mercadoriaData
      );
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <div id="mercadorias-main">
        <div className="mercadorias-title">
          <span className="mercadorias-title-text">
            Gerenciamento de mercadorias
          </span>
          <span className="mercadorias-title-subtext">
            Nesta seção você pode consultar mercadorias, e também realizar o
            cadastro das mesmas.
          </span>
        </div>
        <div className="container-mercadorias">
          <div className="header-chose-option d-flex pb-4">
            <label className="label-mercadorias">Escolha uma opção:</label>
            <select
              onChange={(e) => toggleCadMercadorias(e)}
              className="select-mode-mercadorias form-control"
            >
              <option value="0">Selecione uma opção</option>
              <option value="1">Cadastrar mercadoria</option>
              <option value="2">Consultar mercadorias</option>
              <option value="3">Cadastrar tipo de mercadoria</option>
            </select>
            {consMercadorias && (
              <div className="d-flex align-items-center">
                <label className="ml-3">Mercadoria:</label>
                <input
                  value={searchMercadoriaValue}
                  onChange={(e) => setSearchMercadoriaValue(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') {
                      searchMercadoria();
                    }
                  }}
                  placeholder="Nome ou registro"
                  type="text"
                  className="search-mercadoria form-control"
                />
              </div>
            )}
          </div>
          <div className="form-cad-mercadoria">
            {/* formulario cadastro de mercadorias */}
            {cadMercadorias && (
              <div className="container-form-cad-mercadoria">
                <div className="form-cad-mercadoria-content">
                  <form>
                    <div className="form-group">
                      <label className="label-form-cad-mercadoria">
                        Nome da mercadoria:
                      </label>
                      <input
                        value={mercadoriaData.nome}
                        onChange={(e) =>
                          setMercadoriaData({
                            ...mercadoriaData,
                            nome: e.target.value,
                          })
                        }
                        required
                        type="text"
                        className="form-control"
                      />
                    </div>
                    <div className="form-group">
                      <label className="label-form-cad-mercadoria">
                        Descrição:
                      </label>
                      <input
                        value={mercadoriaData.descricao}
                        onChange={(e) =>
                          setMercadoriaData({
                            ...mercadoriaData,
                            descricao: e.target.value,
                          })
                        }
                        required
                        type="text"
                        className="form-control"
                      />
                    </div>
                    <div className="form-group">
                      <label className="label-form-cad-mercadoria">
                        Fabricante:
                      </label>
                      <input
                        value={mercadoriaData.fabricante}
                        onChange={(e) =>
                          setMercadoriaData({
                            ...mercadoriaData,
                            fabricante: e.target.value,
                          })
                        }
                        required
                        type="text"
                        className="form-control"
                      />
                    </div>
                    <div className="form-group">
                      <label className="label-form-cad-mercadoria">Tipo:</label>
                      <select
                        required
                        className="form-control"
                        onChange={(e) =>
                          setMercadoriaData({
                            ...mercadoriaData,
                            tipo: e.target.value,
                          })
                        }
                      >
                        <option disabled selected value="0">
                          Selecione um tipo
                        </option>
                        {tipoMercadoriaLoad.map((el) => (
                          <option value={el.id}>{el.nome}</option>
                        ))}
                      </select>
                    </div>
                    <div className="form-group">
                      <button
                        onClick={toggleRegisterMercadoria}
                        type="submit"
                        className="btn btn-primary"
                      >
                        Cadastrar mercadoria
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            )}

            {/* tabela de consulta de mercadorias */}
            {consMercadorias && (
              <div className="container-table-mercadorias">
                <Table className="table-mercadorias" striped bordered hover>
                  <thead>
                    <tr>
                      <th>N°. Registro</th>
                      <th>Nome</th>
                      <th>Descrição</th>
                      <th>Fabricante</th>
                      <th>Tipo</th>
                      <th>Estoque</th>
                    </tr>
                  </thead>
                  <tbody>
                    {mercadoriaLoad.map((el) => (
                      <tr>
                        <td>{el.numero_registro}</td>
                        <td>{el.nome}</td>
                        <td>{el.descricao}</td>
                        <td>{el.fabricante}</td>
                        <td>{el.tipo}</td>
                        <td>{el.estoque}</td>
                      </tr>
                    ))}
                  </tbody>
                </Table>
              </div>
            )}

            {/* formulario cadastro de tipo de mercadoria */}
            {tipoMercadoria && (
              <div className="container-form-cad-mercadoria">
                <div className="form-cad-mercadoria-content">
                  <form>
                    <div className="form-group">
                      <label className="label-form-cad-mercadoria">
                        Nome do tipo de mercadoria:
                      </label>
                      <input
                        value={tipoMercadoriaData.nome}
                        onChange={(e) =>
                          setTipoMercadoriaData({
                            ...tipoMercadoriaData,
                            nome: e.target.value,
                          })
                        }
                        required
                        type="text"
                        className="form-control"
                      />
                    </div>
                    <div className="form-group">
                      <label className="label-form-cad-mercadoria">
                        Descrição:
                      </label>
                      <input
                        value={tipoMercadoriaData.descricao}
                        onChange={(e) =>
                          setTipoMercadoriaData({
                            ...tipoMercadoriaData,
                            descricao: e.target.value,
                          })
                        }
                        required
                        type="text"
                        className="form-control"
                      />
                    </div>
                    <div className="form-group">
                      <button
                        onClick={toggleRegisterTipoMercadoria}
                        type="submit"
                        className="btn btn-primary"
                      >
                        Cadastrar tipo de mercadoria
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
