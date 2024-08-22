import React from 'react'
import { Table } from 'react-bootstrap'
import { useState, useEffect } from 'react'
import UnidadeService from '../../../services/unidades'
import VerifyLogin from '../../../utils/auth'
import './index.css'

export default function Unidades() {
	const unidadeService = new UnidadeService()
	const [visualizacao, setVisualizacao] = useState(false)
	const [cadastro, setCadastro] = useState(false)

	const [unidadeData, setUnidadeData] = useState({
		nome: '',
		cidade: '',
		uf: '',
		endereco: '',
	})

	const [unidadesLoad, setUnidadesLoad] = useState([])

	const toggleOperacao = (e) => {
		let value = e.target.value
		if (value != 0) {
			if (value == 1) {
				setVisualizacao(true)
				setCadastro(false)
				return
			} else {
				setCadastro(true)
				setVisualizacao(false)
				return
			}
		}
		setCadastro(false)
		setVisualizacao(false)
	}

	useEffect(() => {
		VerifyLogin()
		loadUnidades()
	}, [])

	const loadUnidades = async () => {
		try {
			const response = await unidadeService.load(unidadeData)
			if (response.status === 200) {
				setUnidadesLoad(response.data)
			}
		} catch (error) {
			console.log(error)
		}
	}

	const handleRegister = async () => {
		try {
			const response = await unidadeService.unidadeRegister(unidadeData)
			if (response.status === 200) {
				window.alert('Unidade cadastrada com sucesso')
				setUnidadeData({
					nome: '',
					cidade: '',
					uf: '',
					endereco: '',
				})
			}
		} catch (error) {
			window.alert('Erro ao cadastrar unidade')
		}
	}

	return (
		<>
			<div id="unidades-main">
				<div className="unidades-title">
					<span className="unidades-title-text">Gerenciamento de unidades</span>
					<span className="unidades-title-subtext">
						Nesta seção você pode cadastrar e visualizar as unidades.
					</span>
				</div>
				<div className="container-unidades">
					<div className="header-chose-option d-flex pb-4">
						<label className="label-unidades">Escolha uma opção:</label>
						<select onChange={(e) => toggleOperacao(e)} className="select-mode-unidades form-control">
							<option selected value={0}>
								Selecione o tipo operação
							</option>
							<option value={1}>Visualizar unidades</option>
							<option value={2}>Cadastrar unidade</option>
						</select>
					</div>

					<div className="infos-unidades">
						{/* informacoes de entrada */}
						{visualizacao && (
							<div className="container-table-unidades">
								<Table
									striped
									bordered
									hover
									className="table-mercadorias"
									style={{ width: '100%', borderCollapse: 'collapse' }}
								>
									<thead>
										<tr>
											<th>Nome</th>
											<th>Cidade</th>
											<th>UF</th>
											<th>Endereco</th>
										</tr>
									</thead>
									<tbody>
										{unidadesLoad.map((el) => (
											<tr>
												<td>{el.nome}</td>
												<td>{el.cidade}</td>
												<td>{el.uf}</td>
												<td>{el.endereco}</td>
											</tr>
										))}
									</tbody>
								</Table>
							</div>
						)}

						{/* Cadastro de unidade */}
						{cadastro && (
							<div className="container-table-unidades">
								<div className="form-movimento">
									<label className="label-movimentacoes">Nome:</label>
									<input
										onChange={(e) => setUnidadeData({ ...unidadeData, nome: e.target.value })}
										value={unidadeData.nome}
										className="form-control"
										placeholder="Informe o nome da unidade"
									></input>

									<label className="label-movimentacoes">Cidade:</label>
									<input
										onChange={(e) => setUnidadeData({ ...unidadeData, cidade: e.target.value })}
										value={unidadeData.cidade}
										className="form-control"
										placeholder="Informe a cidade da unidade"
									></input>

									<label className="label-movimentacoes">UF:</label>
									<input
										onChange={(e) => setUnidadeData({ ...unidadeData, uf: e.target.value })}
										value={unidadeData.uf}
										className="form-control"
										placeholder="Informe a UF da unidade"
									></input>
									<label className="label-movimentacoes">Endereco::</label>
									<input
										onChange={(e) => setUnidadeData({ ...unidadeData, endereco: e.target.value })}
										value={unidadeData.endereco}
										className="form-control"
										placeholder="Informe o endereco da unidade"
									></input>
									<button onClick={handleRegister} className="btn btn-primary mt-3">
										Cadastrar
									</button>
								</div>
							</div>
						)}
					</div>
				</div>
			</div>
		</>
	)
}
