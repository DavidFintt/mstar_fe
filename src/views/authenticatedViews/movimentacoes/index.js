import React from "react";
import { Table } from "react-bootstrap";
import { useState, useEffect } from "react";
import MovimentacoesService from "../../../services/movimentacoes";
import pdfIcon from "../../../assets/movimentacoes/icons/pdf-icon.png";
import "./index.css";

export default function Movimentacoes() {
  const movimentacoesService = new MovimentacoesService();

  const [entradas, setEntradas] = useState(false);
  const [saidas, setSaidas] = useState(false);

  const [entradaData, setEntradaData] = useState([]);
  const [saidaData, setSaidaData] = useState([]);
  
  

  useEffect(() => {
    loadEntradas();
    loadSaidas();
  }, []);

  const toggleMovimentacoes = (e) => {
    let value = e.target.value;
    if (value != 0) {
      if (value == 1) {
        setEntradas(true);
        setSaidas(false);
        return;
      } else {
        setSaidas(true);
        setEntradas(false);
        return;
      }
    }
    setEntradas(false);
    setSaidas(false);
  };

  const loadEntradas = async () => {
    try {
      const response = await movimentacoesService.loadEntrada(entradaData);
      response.data.map((el) => {
        el.data = new Date(el.data).toLocaleDateString('pt-BR');
      })
      if (response.status === 200) {
        setEntradaData(response.data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const loadSaidas = async () => {
    try {
      const response = await movimentacoesService.loadSaida(saidaData);
      response.data.map((el) => {
        el.data = new Date(el.data).toLocaleDateString('pt-BR');
      })
      if (response.status === 200) {
        console.log(response.data);
        setSaidaData(response.data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      {/* modal pdf */}
      <div
        class="modal fade"
        id="modalPdf"
        tabindex="-1"
        role="dialog"
        aria-labelledby="modalPdfLabel"
        aria-hidden="true"
      >
        <div class="modal-dialog" role="document">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title" id="modalPdf">
                Gerar relatório mensal
              </h5>
              <button
                type="button"
                class="close"
                data-dismiss="modal"
                aria-label="Close"
              >
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div class="modal-body">
              <label >Selecione o mês: </label>
              <input type="month" className="form-control"></input>

            </div>
            <div class="modal-footer">
              <button
                type="button"
                class="btn btn-secondary"
                data-dismiss="modal"
              >
                Close
              </button>
              <button type="button" class="btn btn-primary">
                Gerar relatório
              </button>
            </div>
          </div>
        </div>
      </div>


      <div id="movimentacoes-main">
        <div className="movimentacoes-title">
          <span className="movimentacoes-title-text">
            Movimentações de entrada e saida de mercadorias.
          </span>
          <span className="movimentacoes-title-subtext">
            Seção destinada a visualização de movimentações de entrada e saída
            de mercadorias.
          </span>
        </div>
        <div className="container-movimentacoes">
          <div className="header-chose-option d-flex pb-4">
            <label className="label-movimentacoes">Escolha uma opção:</label>
            <select
              onChange={(e) => toggleMovimentacoes(e)}
              className="select-mode-movimentacoes form-control"
            >
              <option selected value="0">
                Selecione o tipo de visualização
              </option>
              <option value="1">Entrada de mercadorias</option>
              <option value="2">Saída de mercadorias</option>
            </select>
            {(entradas || saidas) && (
              <>
                <div className="d-flex align-items-center">
                  <label className="ml-3">Mercadoria:</label>
                  <input
                    placeholder="Nome ou registro"
                    type="text"
                    className="search-mercadoria form-control"
                  />
                  <label className="ml-3">Data:</label>
                  <input
                    type="date"
                    className="search-mercadoria form-control"
                  />
                </div>
                <div className="pdf-button-div">
                  <img data-toggle="modal" data-target="#modalPdf" className="pdf-image" src={pdfIcon}></img>
                </div>
              </>
            )}
          </div>

          <div className="infos-movimentacoes">
            {/* informacoes de entrada */}
            {entradas && (
              <div className="container-table-mercadorias">
                <Table
                  striped
                  bordered
                  hover
                  className="table-mercadorias"
                  style={{ width: "100%", borderCollapse: "collapse" }}
                >
                  <thead>
                    <tr>
                      <th>Mercadoria</th>
                      <th>Quantidade</th>
                      <th>Unidade</th>
                      <th>Data</th>
                      <th>Usuário</th>
                    </tr>
                  </thead>
                  <tbody>
                    {entradaData.map((el) => (
                      <tr>
                        <td>{el.nome_mercadoria}</td>
                        <td>{el.quantidade}</td>
                        <td>{el.unidade}</td>
                        <td>{el.data}</td>
                        <td>{el.usuario}</td>
                      </tr>
                    ))}
                  </tbody>
                </Table>
              </div>
            )}

            {/* informacoes de saida */}
            {saidas && (
              <div className="container-table-mercadorias">
                <Table
                  striped
                  bordered
                  hover
                  className="table-mercadorias"
                  style={{ width: "100%", borderCollapse: "collapse" }}
                >
                  <thead>
                    <tr>
                      <th>Mercadoria</th>
                      <th>Quantidade</th>
                      <th>Unidade de saida</th>
                      <th>Unidade de destino</th>
                      <th>Data</th>
                      <th>Usuário</th>
                    </tr>
                  </thead>
                  <tbody>
                    {saidaData.map((el) => (
                      <tr>
                        <td>{el.nome_mercadoria}</td>
                        <td>{el.quantidade}</td>
                        <td>{el.unidade_saida}</td>
                        <td>{el.unidade_destino}</td>
                        <td>{el.data}</td>
                        <td>{el.usuario}</td>
                      </tr>
                    ))}
                  </tbody>
                </Table>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
