import MercadoriaService from '../../../services/mercadorias'
import { useState, useEffect } from 'react'

export default function CadastroTipoMercadoria() {
	const mercadoriaService = new MercadoriaService()

	const [tipoMercadoriaData, setTipoMercadoriaData] = useState({
		nome: '',
		descricao: '',
	})

	const toggleRegisterTipoMercadoria = async () => {
		try {
			if (tipoMercadoriaData.nome === '' || tipoMercadoriaData.descricao === '') {
				window.alert('Preencha todos os campos')
				return
			}
			if (tipoMercadoriaData.nome.length > 50 || tipoMercadoriaData.descricao.length > 100) {
				window.alert('O nome do tipo deve possuir apenas 50 caracteres, e a descrição 100 caracteres')
				return
			}
			const response = await mercadoriaService.tipoMercadoriaRegister(tipoMercadoriaData)
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
							<label className="label-form-cad-mercadoria">Nome do tipo de mercadoria:</label>
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
							<label className="label-form-cad-mercadoria">Descrição:</label>
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
							<button onClick={toggleRegisterTipoMercadoria} type="submit" className="btn btn-primary">
								Cadastrar tipo de mercadoria
							</button>
						</div>
					</form>
				</div>
			</div>
		</>
	)
}
