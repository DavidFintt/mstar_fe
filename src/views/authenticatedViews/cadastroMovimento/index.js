import React from "react";
import { Table } from "react-bootstrap";
import { useState, useEffect } from "react";
import MovimentacoesService from "../../../services/movimentacoes";
import UnidadeService from "../../../services/unidades";
import MercadoriaService from "../../../services/mercadorias";
import "./index.css";

export default function CadastroMovimentos() {
  const movimentacoesService = new MovimentacoesService();
  const unidadeService = new UnidadeService();
  const mercadoriaService = new MercadoriaService();

  const [entradas, setEntradas] = useState(false);
  const [saidas, setSaidas] = useState(false);
  const [entradasLoad, setEntradasLoad] = useState([]);
  const [saidasLoad, setSaidasLoad] = useState([]);
  const [unidades, setUnidades] = useState([]);
  const [mercadorias, setMercadorias] = useState([]);

  const [entradaData, setEntradaData] = useState({
    unidade: 0,
    mercadoria: 0,
    quantidade: "",
  });

  const [saidaData, setSaidaData] = useState({
    unidade_saida: 0,
    unidade_destino: 0,
    mercadoria: 0,
    quantidade: "",
  });

  useEffect(() => {
    loadUnidades();
    loadMercadorias();
  }, []);

  const loadUnidades = async () => {
    try {
      const response = await unidadeService.load();
      if (response.status === 200) {
        setUnidades(response.data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const loadMercadorias = async () => {
    try {
      const response = await mercadoriaService.mercadoriaLoad();
      if (response.status === 200) {
        setMercadorias(response.data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const toggleTipoMovimentacoes = (e) => {
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

  const handleRegister = async () => {
    try {
      if (entradas) {
        if (entradaData.unidade == 0 || entradaData.mercadoria == 0 || entradaData.quantidade == "") {
          window.confirm("Preencha todos os campos");
          return;
        }
        if (entradaData.quantidade < 1) {
          window.confirm("Quantidade de entrada deve ser maior que 0");
          return;
        }
        const response = await movimentacoesService.registerEntrada(
          entradaData
        );
        if (response.status === 200) {
          setEntradaData({ unidade: 0, mercadoria: 0, quantidade: "" });
          window.confirm("Movimentação cadastrada com sucesso");
        }
      } else {
        if (saidaData.unidade_saida === saidaData.unidade_destino) {
          window.confirm("Unidades de origem e destino não podem ser iguais");
          return;
        } 
        if(saidaData.quantidade > mercadorias.find(mercadoria => mercadoria.id == saidaData.mercadoria).estoque){ 
          window.confirm("Quantidade de saída maior que o estoque disponível");
          return;
        }
        if (saidaData.quantidade < 1) {
          window.confirm("Quantidade de saída deve ser maior que 0");
          return;
        }
        if(saidaData.unidade_saida == 0 || saidaData.unidade_destino == 0 || saidaData.mercadoria == 0){
          window.confirm("Preencha todos os campos");
          return;
        }
        const response = await movimentacoesService.registerSaida(saidaData);
        if (response.status === 200) {
          setSaidaData({
            unidade_saida: 0,
            unidade_destino: 0,
            mercadoria: 0,
            quantidade: "",
          });
          window.confirm("Movimentação cadastrada com sucesso");
        }
      }
    } catch (error) {
      window.confirm("Erro ao cadastrar movimentação");
    }
  };

  return (
    <>
      <div id="movimentacoes-main">
        <div className="movimentacoes-title">
          <span className="movimentacoes-title-text">
            Cadastro de entradas e saídas de mercadorias.
          </span>
          <span className="movimentacoes-title-subtext">
            Aqui você pode cadastrar as entradas e saídas de mercadorias do seu
            estoque.
          </span>
        </div>
        <div className="container-movimentacoes">
          <div className="header-chose-option d-flex pb-4">
            <label className="label-movimentacoes">Escolha uma opção:</label>
            <select
              onChange={(e) => toggleTipoMovimentacoes(e)}
              className="select-mode-movimentacoes form-control"
            >
              <option selected value="0">
                Selecione o tipo de cadastro
              </option>
              <option value="1">Entrada de mercadorias</option>
              <option value="2">Saída de mercadorias</option>
            </select>
          </div>

          <div className="infos-movimentacoes">

            
            {/* informacoes de entrada */}
            {entradas && (
              <div className="container-table-mercadorias">
                <div className="form-movimento">
                  <label className="label-movimentacoes">Mercadoria:</label>
                  <select
                    className="form-control"
                    value={entradaData.mercadoria}
                    onChange={(e) =>
                      setEntradaData({
                        ...entradaData,
                        mercadoria: e.target.value,
                      })
                    }
                  >
                    <option disabled value={0}>
                      Selecionar mercadoria
                    </option>
                    {mercadorias.map((mercadoria) => (
                      <option value={mercadoria.id}>{mercadoria.nome}</option>
                    ))}
                  </select>

                  <label className="label-movimentacoes">
                    Unidade de entrada:
                  </label>
                  <select
                    className="form-control"
                    value={entradaData.unidade}
                    onChange={(e) =>
                      setEntradaData({
                        ...entradaData,
                        unidade: e.target.value,
                      })
                    }
                  >
                    <option selected disabled value={0}>
                      Selecionar unidade de entrada
                    </option>
                    {unidades.map((unidade) => (
                      <option value={unidade.id}>{unidade.nome}</option>
                    ))}
                  </select>
                  <label className="label-movimentacoes">Quantidade:</label>
                  <input
                    value={entradaData.quantidade}
                    type="number"
                    className="form-control"
                    placeholder="Quantidade"
                    min={1}
                    onChange={(e) =>
                      setEntradaData({
                        ...entradaData,
                        quantidade: e.target.value,
                      })
                    }
                  />
                  <button
                    onClick={handleRegister}
                    className="btn btn-primary mt-3"
                  >
                    Cadastrar entrada
                  </button>
                </div>
              </div>
            )}

            {/* informacoes de saida */}
            {saidas && (
              <div className="container-table-mercadorias">
                <div className="form-movimento">
                  <label className="label-movimentacoes">Mercadoria:</label>
                  <select
                    className="form-control"
                    value={saidaData.mercadoria}
                    onChange={(e) =>
                      setSaidaData({
                        ...saidaData,
                        mercadoria: e.target.value,
                      })
                    }
                  >
                    <option disabled value={0}>
                      Selecionar mercadoria
                    </option>
                    {mercadorias
                      .filter((el) => el.estoque > 0)
                      .map((mercadoria) => (
                        <option value={mercadoria.id}>{mercadoria.nome}</option>
                      ))}
                  </select>

                  <label className="label-movimentacoes">
                    Unidade de saida:
                  </label>
                  <select
                    className="form-control"
                    value={saidaData.unidade_saida}
                    onChange={(e) =>
                      setSaidaData({
                        ...saidaData,
                        unidade_saida: e.target.value,
                      })
                    }
                  >
                    {unidades.map((unidade) => (
                      <option value={unidade.id}>{unidade.nome}</option>
                    ))}
                    <option selected disabled value={0}>
                      Selecionar unidade de saida
                    </option>
                  </select>

                  <label className="label-movimentacoes">
                    Unidade de destino:
                  </label>
                  <select
                    className="form-control"
                    value={saidaData.unidade_destino}
                    onChange={(e) =>
                      setSaidaData({
                        ...saidaData,
                        unidade_destino: e.target.value,
                      })
                    }
                  >
                    <option disabled value={0}>
                      Selecionar unidade de destino
                    </option>
                    {unidades.map((unidade) => (
                      <option key={unidade.id} value={unidade.id}>
                        {unidade.nome}
                      </option>
                    ))}
                  </select>
                  <label className="label-movimentacoes">Quantidade:</label>
                  <input
                    type="number"
                    className="form-control"
                    value={saidaData.quantidade}
                    placeholder="Quantidade"
                    min={1}
                    onChange={(e) =>
                      setSaidaData({
                        ...saidaData,
                        quantidade: e.target.value,
                      })
                    }
                  />
                  <button
                    onClick={handleRegister}
                    className="btn btn-primary mt-3"
                  >
                    Cadastrar
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
