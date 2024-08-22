import React from 'react'
import { Table } from 'react-bootstrap'
import { useState, useEffect } from 'react'
import MovimentacoesService from '../../../services/movimentacoes'
import PdfComponent from '../../../components/movimentacoes/gerarPdf'
import RelatorioService from '../../../services/relatorios'
import VerifyLogin from '../../../utils/auth'
import './index.css'

export default function Movimentacoes() {
	const movimentacoesService = new MovimentacoesService()

	const [entradas, setEntradas] = useState(false)
	const [saidas, setSaidas] = useState(false)

	const [entradaData, setEntradaData] = useState([])
	const [saidaData, setSaidaData] = useState([])

	const [entradaDataCopy, setEntradaDataCopy] = useState([])
	const [saidaDataCopy, setSaidaDataCopy] = useState([])

	useEffect(() => {
		VerifyLogin()
		loadEntradas()
		loadSaidas()
	}, [])

	const loadEntradas = async () => {
		try {
			const response = await movimentacoesService.loadEntrada(entradaData)
			response.data.map((el) => {
				el.data = new Date(el.data).toLocaleDateString('pt-BR')
			})
			if (response.status === 200) {
				setEntradaData(response.data)
				setEntradaDataCopy(response.data)
			}
		} catch (error) {
			console.log(error)
		}
	}

	const loadSaidas = async () => {
		try {
			const response = await movimentacoesService.loadSaida(saidaData)
			response.data.map((el) => {
				el.data = new Date(el.data).toLocaleDateString('pt-BR')
			})
			if (response.status === 200) {
				setSaidaData(response.data)
				setSaidaDataCopy(response.data)
			}
		} catch (error) {
			console.log(error)
		}
	}

	const toggleMovimentacoes = (e) => {
		let value = e.target.value
		if (value != 0) {
			if (value == 1) {
				setEntradas(true)
				setSaidas(false)
				return
			} else {
				setSaidas(true)
				setEntradas(false)
				return
			}
		}
		setEntradas(false)
		setSaidas(false)
	}

	const searchMercadoria = (e) => {
		let value = e.target.value
		if (value.length > 0) {
			if (entradas) {
				let data = entradaDataCopy.filter((el) => el.nome_mercadoria === value || el.numero_registro === value)
				setEntradaData(data)
			} else {
				let data = saidaDataCopy.filter((el) => el.nome_mercadoria === value || el.numero_registro === value)
				setSaidaData(data)
			}
		} else {
			if (entradas) {
				setEntradaData(entradaDataCopy)
			} else {
				setSaidaData(saidaDataCopy)
			}
		}
	}

	return (
		<>
			<div id="movimentacoes-main">
				<div className="movimentacoes-title">
					<span className="movimentacoes-title-text">Movimentações de entrada e saida de mercadorias.</span>
					<span className="movimentacoes-title-subtext">
						Seção destinada a visualização de movimentações de entrada e saída de mercadorias.
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
										onChange={(e) => {
											searchMercadoria(e)
										}}
										placeholder="Nome ou registro"
										type="text"
										className="search-mercadoria form-control"
									/>
									<PdfComponent
										entradas={entradas}
										saidas={saidas}
										entradasData={entradaData}
										saidasData={saidaData}
									/>
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
									style={{ width: '100%', borderCollapse: 'collapse' }}
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
									style={{ width: '100%', borderCollapse: 'collapse' }}
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
	)
}
