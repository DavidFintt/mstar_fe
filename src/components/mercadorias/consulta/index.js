import MercadoriaService from '../../../services/mercadorias'
import { useState, useEffect } from 'react'
import { Table } from 'react-bootstrap'

export default function ConsultaMercadoria() {
	const mercadoriaService = new MercadoriaService()

	const [mercadoriaLoad, setMercadoriaLoad] = useState([])
	const [mercadoriaDataCopy, setMercadoriaDataCopy] = useState([])
	const [searchMercadoriaValue, setSearchMercadoriaValue] = useState('')

	useEffect(() => {
		loadMercadorias();
	  }, []);

	const loadMercadorias = async () => {
		try {
			const response = await mercadoriaService.mercadoriaLoad()
			setMercadoriaLoad(response.data)
			setMercadoriaDataCopy(response.data)
		} catch (error) {
			console.log(error)
		}
	}

	const searchMercadoria = async () => {
		try {
			if (searchMercadoriaValue !== '') {
				let mercadoriaResult = mercadoriaLoad.filter(
					(el) => el.nome === searchMercadoriaValue || el.numero_registro === parseInt(searchMercadoriaValue),
				)

				setMercadoriaLoad(mercadoriaResult)
				return
			} else {
				setMercadoriaLoad(mercadoriaDataCopy)
				return
			}
		} catch (error) {
			console.log(error)
		}
	}

	return (
		<>
			<div className="container-table-mercadorias">
				<div className="d-flex align-items-center">
					<label className="ml-3">Mercadoria:</label>
					<input
						value={searchMercadoriaValue}
						onChange={(e) => setSearchMercadoriaValue(e.target.value)}
						onKeyDown={(e) => {
							if (e.key === 'Enter') {
								searchMercadoria()
							}
						}}
						placeholder="Nome ou registro"
						type="text"
						className="search-mercadoria form-control"
					/>
				</div>
				<Table className="table-mercadorias" striped bordered hover>
					<thead>
						<tr>
							<th>N°. Registro</th>
							<th>Nome</th>
							<th>Descrição</th>
							<th>Fabricante</th>
							<th>Tipo</th>
							<th>Estoque</th>
						</tr>
					</thead>
					<tbody>
						{mercadoriaLoad.map((el) => (
							<tr>
								<td>{el.numero_registro}</td>
								<td>{el.nome}</td>
								<td>{el.descricao}</td>
								<td>{el.fabricante}</td>
								<td>{el.tipo}</td>
								<td>{el.estoque}</td>
							</tr>
						))}
					</tbody>
				</Table>
			</div>
		</>
	)
}
