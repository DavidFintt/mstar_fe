import React from "react";
import { Table } from "react-bootstrap";
import { useState } from "react";
import MercadoriaService from "../../../services/mercadorias";
import "./index.css";

export default function Mercadorias() {
  const mercadoriaService = new MercadoriaService();

  const [cadMercadorias, setCadMercadorias] = useState(false);
  const [consMercadorias, setConsMercadorias] = useState(false);
  const [tipoMercadoria, setTipoMercadoria] = useState(false);
  const [mercadoriaData, setMercadoriaData] = useState({
    nome: "",
    descricao: "",
    fabricante: "",
    tipo: "",
  });

  const [tipoMercadoriaData, setTipoMercadoriaData] = useState({
    nome: "",
    descricao: "",
  })

  const toggleCadMercadorias = (e) => {
    let value = parseInt(e.target.value);
    console.log(value);
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
      if(tipoMercadoriaData.nome === "" || tipoMercadoriaData.descricao === "") {
        alert("Preencha todos os campos");
        return;
      }
      if(tipoMercadoriaData.nome.length > 50 || tipoMercadoriaData.descricao.length > 100) {
        alert("O nome do tipo deve possuir apenas 50 caracteres, e a descrição 100 caracteres");
        return;
      }
      const response = await mercadoriaService.tipoMercadoria(tipoMercadoriaData);
    } catch (error) {
      console.log(error);
  }

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
                        required
                        type="text"
                        className="form-control"
                      />
                    </div>
                    <div className="form-group">
                      <label className="label-form-cad-mercadoria">Tipo:</label>
                      <select className="form-control">
                        <option required disabled selected value="0">
                          Selecione um tipo
                        </option>
                        <option value="1">Unidade</option>
                        <option value="2">Peso</option>
                      </select>
                    </div>
                    <div className="form-group">
                      <button type="submit" className="btn btn-primary">
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
                <Table striped bordered hover>
                  <thead>
                    <tr>
                      <th>Nome</th>
                      <th>Descrição</th>
                      <th>Fabricante</th>
                      <th>Tipo</th>
                      <th>Estoque</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>Arroz</td>
                      <td>Arroz tipo 1</td>
                      <td>Arroz e cia</td>
                      <td>Unidade</td>
                      <td>20</td>
                    </tr>
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
                        onChange={(e) => setTipoMercadoriaData({ ...tipoMercadoriaData, nome: e.target.value })}
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
                        onChange={(e) => setTipoMercadoriaData({ ...tipoMercadoriaData, descricao: e.target.value })}
                        required
                        type="text"
                        className="form-control"
                      />
                    </div>
                    <div className="form-group">
                      <button onClick={toggleRegisterTipoMercadoria} type="submit" className="btn btn-primary">
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
}