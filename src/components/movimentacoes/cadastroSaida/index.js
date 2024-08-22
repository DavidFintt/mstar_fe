import { useState, useEffect } from 'react'
import MovimentacoesService from '../../../services/movimentacoes'
import UnidadeService from '../../../services/unidades'
import MercadoriaService from '../../../services/mercadorias'

export default function CadastroSaida() {
	const movimentacoesService = new MovimentacoesService()
	const unidadeService = new UnidadeService()
	const mercadoriaService = new MercadoriaService()

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

	const handleRegister = async () => {
		try {
			if (saidaData.unidade_saida === saidaData.unidade_destino) {
				window.alert('Unidades de origem e destino não podem ser iguais')
				return
			}
			if (
				saidaData.quantidade > mercadorias.find((mercadoria) => mercadoria.id == saidaData.mercadoria).estoque
			) {
				window.alert('Quantidade de saída maior que o estoque disponível')
				return
			}
			if (saidaData.quantidade < 1) {
				window.alert('Quantidade de saída deve ser maior que 0')
				return
			}
			if (saidaData.unidade_saida == 0 || saidaData.unidade_destino == 0 || saidaData.mercadoria == 0) {
				window.alert('Preencha todos os campos')
				return
			}
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

				<label className="label-movimentacoes">Unidade de saida:</label>
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

				<label className="label-movimentacoes">Unidade de destino:</label>
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
				<button onClick={handleRegister} className="btn btn-primary mt-3">
					Cadastrar
				</button>
			</div>
		</div>
	)
}
