import { useState, useEffect } from 'react'
import MercadoriaService from '../../../services/mercadorias'


export default function CadastroMercadorias() {
	const mercadoriaService = new MercadoriaService()

	const [tipoMercadoriaLoad, setTipoMercadoriaLoad] = useState([])
	const [mercadoriaData, setMercadoriaData] = useState({
		nome: '',
		descricao: '',
		fabricante: '',
		tipo: '',
	})

	useEffect(() => {
		loadTipoMercadoria()
	}, [])

	const loadTipoMercadoria = async () => {
		try {
			const response = await mercadoriaService.tipoMercadoriaLoad()
			setTipoMercadoriaLoad(response.data)
		} catch (error) {
			console.log(error)
		}
	}

	const toggleRegisterMercadoria = async () => {
		try {
			if (
				mercadoriaData.nome === '' ||
				mercadoriaData.descricao === '' ||
				mercadoriaData.fabricante === '' ||
				mercadoriaData.tipo === ''
			) {
				window.alert('Preencha todos os campos')
				return
			}
			if (
				mercadoriaData.nome.length > 50 ||
				mercadoriaData.descricao.length > 100 ||
				mercadoriaData.fabricante.length > 50
			) {
				window.alert(
					'O nome da mercadoria deve possuir apenas 50 caracteres, a descrição 100 caracteres e o fabricante 50 caracteres',
				)
				return
			}
			const response = await mercadoriaService.mercadoriaRegister(mercadoriaData)
			if (response.status === 200) {
				window.alert('Mercadoria cadastrada com sucesso !')
			}
		} catch (error) {
			console.log(error)
		}
	}

	return (
		<>
			<div className="container-form-cad-mercadoria">
				<div className="form-cad-mercadoria-content">
					<form>
						<div className="form-group">
							<label className="label-form-cad-mercadoria">Nome da mercadoria:</label>
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
							<label className="label-form-cad-mercadoria">Descrição:</label>
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
							<label className="label-form-cad-mercadoria">Fabricante:</label>
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
								{tipoMercadoriaLoad?.map((el) => (
									<option value={el.id}>{el.nome}</option>
								))}
							</select>
						</div>
						<div className="form-group">
							<button onClick={toggleRegisterMercadoria} type="submit" className="btn btn-primary">
								Cadastrar mercadoria
							</button>
						</div>
					</form>
				</div>
			</div>
		</>
	)
}
