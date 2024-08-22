import { useState, useEffect } from 'react'
import MovimentacoesService from '../../../services/movimentacoes'
import UnidadeService from '../../../services/unidades'
import MercadoriaService from '../../../services/mercadorias'

export default function CadastroEntrada() {
	const movimentacoesService = new MovimentacoesService()
	const unidadeService = new UnidadeService()
	const mercadoriaService = new MercadoriaService()

	const [unidades, setUnidades] = useState([])
	const [mercadorias, setMercadorias] = useState([])
	const [entradaData, setEntradaData] = useState({
		unidade: 0,
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
			if (entradaData.unidade == 0 || entradaData.mercadoria == 0 || entradaData.quantidade == '') {
				window.alert('Preencha todos os campos')
				return
			}
			if (entradaData.quantidade < 1) {
				window.alert('Quantidade de entrada deve ser maior que 0')
				return
			}
			const response = await movimentacoesService.registerEntrada(entradaData)
			if (response.status === 200) {
				setEntradaData({ unidade: 0, mercadoria: 0, quantidade: '' })
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

				<label className="label-movimentacoes">Unidade de entrada:</label>
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
				<button onClick={handleRegister} className="btn btn-primary mt-3">
					Cadastrar entrada
				</button>
			</div>
		</div>
	)
}
