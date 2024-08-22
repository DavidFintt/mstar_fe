import pdfIcon from '../../../assets/movimentacoes/icons/pdf-icon.png'
import RelatorioService from '../../../services/relatorios'
import { useState } from 'react'

export default function PdfComponent(props) {
	const relatorioService = new RelatorioService()

	const [dadosRelatorio, setDadosRelatorio] = useState([])
	const [dataDoRelatorio, setDataDoRelatorio] = useState('')

	const togglePdf = (e) => {
		let anoMes = e.target.value
		try {
			let choice = props.entradas ? props.entradasData : props.saidasData
			let movimentoMensal = choice.filter((el) => {
				const [day, month, year] = el.data.split('/').map(Number)
				const date = new Date(year, month - 1, day)

				const elementYear = date.getFullYear()
				const elementMonth = (date.getMonth() + 1).toString().padStart(2, '0')
				const [inputYear, inputMonth] = anoMes.split('-')

				return elementYear.toString() === inputYear && elementMonth === inputMonth
			})
			setDadosRelatorio(movimentoMensal)
		} catch (error) {
			console.log(error)
		}
	}

	const gerarPdfMovimentacoes = async () => {
		try {
			if (dadosRelatorio.length === 0) {
				window.alert('Nenhuma movimentação encontrada para o mês selecionado.')
				return
			}
			const response = await relatorioService.createPdf(dadosRelatorio)
			if (response.status === 200) {
				setDataDoRelatorio('')
			}
		} catch (error) {
			setDataDoRelatorio('')
			console.log(error)
		}
	}

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
							<button type="button" class="close" data-dismiss="modal" aria-label="Close">
								<span aria-hidden="true">&times;</span>
							</button>
						</div>
						<div class="modal-body">
							<label>Selecione o mês: </label>
							<input
								value={dataDoRelatorio}
								onChange={(e) => {
									setDataDoRelatorio(e.target.value)
									togglePdf(e)
								}}
								type="month"
								className="form-control"
							></input>
						</div>
						<div class="modal-footer">
							<button type="button" class="btn btn-secondary" data-dismiss="modal">
								Close
							</button>
							<button onClick={gerarPdfMovimentacoes} type="button" class="btn btn-primary">
								Gerar relatório
							</button>
						</div>
					</div>
				</div>
			</div>
			<div className="pdf-button-div">
				<img data-toggle="modal" data-target="#modalPdf" className="pdf-image" src={pdfIcon}></img>
			</div>
		</>
	)
}
