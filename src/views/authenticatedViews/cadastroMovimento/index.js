import React from 'react'
import { useState, useEffect } from 'react'
import MovimentacoesService from '../../../services/movimentacoes'
import UnidadeService from '../../../services/unidades'
import MercadoriaService from '../../../services/mercadorias'
import CadastroEntrada from '../../../components/movimentacoes/cadastroEntrada'
import CadastroSaida from '../../../components/movimentacoes/cadastroSaida'
import './index.css'

export default function CadastroMovimentos() {
	const movimentacoesService = new MovimentacoesService()
	const unidadeService = new UnidadeService()
	const mercadoriaService = new MercadoriaService()
	const [entradas, setEntradas] = useState(false)
	const [saidas, setSaidas] = useState(false)
	const [unidades, setUnidades] = useState([])
	const [mercadorias, setMercadorias] = useState([])

	const [saidaData, setSaidaData] = useState({
		unidade_saida: 0,
		unidade_destino: 0,
		mercadoria: 0,
		quantidade: '',
	})

	useEffect(() => {
		loadUnidades()
		loadMercadorias()
	}, [])

	const loadUnidades = async () => {
		try {
			const response = await unidadeService.load()
			if (response.status === 200) {
				setUnidades(response.data)
			}
		} catch (error) {
			console.log(error)
		}
	}

	const loadMercadorias = async () => {
		try {
			const response = await mercadoriaService.mercadoriaLoad()
			if (response.status === 200) {
				setMercadorias(response.data)
			}
		} catch (error) {
			console.log(error)
		}
	}

	const toggleTipoMovimentacoes = (e) => {
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

	const handleRegister = async () => {
		try {
			const response = await movimentacoesService.registerSaida(saidaData)
			if (response.status === 200) {
				setSaidaData({
					unidade_saida: 0,
					unidade_destino: 0,
					mercadoria: 0,
					quantidade: '',
				})
				window.alert('Movimentação cadastrada com sucesso')
			}
		} catch (error) {
			window.alert('Erro ao cadastrar movimentação')
		}
	}

	return (
		<>
			<div id="movimentacoes-main">
				<div className="movimentacoes-title">
					<span className="movimentacoes-title-text">Cadastro de entradas e saídas de mercadorias.</span>
					<span className="movimentacoes-title-subtext">
						Aqui você pode cadastrar as entradas e saídas de mercadorias do seu estoque.
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
						{entradas && <CadastroEntrada />}

						{/* informacoes de saida */}
						{saidas && <CadastroSaida />}
					</div>
				</div>
			</div>
		</>
	)
}
