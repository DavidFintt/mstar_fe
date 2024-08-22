import React from 'react'
import { useState, useEffect } from 'react'
import './index.css'
import MercadoriaService from '../../../services/mercadorias'
import CadastroMercadorias from '../../../components/mercadorias/cadastro'
import ConsultaMercadoria from '../../../components/mercadorias/consulta'
import CadastroTipoMercadoria from '../../../components/mercadorias/cadastroTipo'
import VerifyLogin from '../../../utils/auth'

export default function Dashboard() {
	const mercadoriaService = new MercadoriaService()

	const [cadMercadorias, setCadMercadorias] = useState(false)
	const [consMercadorias, setConsMercadorias] = useState(false)
	const [tipoMercadoria, setTipoMercadoria] = useState(false)

	useEffect(() => {
		VerifyLogin()
	}, [])

	const toggleCadMercadorias = (e) => {
		let value = parseInt(e.target.value)
		if (value !== 0) {
			if (value === 1) {
				setCadMercadorias(true)
				setConsMercadorias(false)
				setTipoMercadoria(false)
			} else if (value === 2) {
				setCadMercadorias(false)
				setConsMercadorias(true)
				setTipoMercadoria(false)
			} else {
				setCadMercadorias(false)
				setConsMercadorias(false)
				setTipoMercadoria(true)
			}
			return
		}
		setCadMercadorias(false)
		setConsMercadorias(false)
		setTipoMercadoria(false)
	}

	return (
		<>
			<div id="mercadorias-main">
				<div className="mercadorias-title">
					<span className="mercadorias-title-text">Gerenciamento de mercadorias</span>
					<span className="mercadorias-title-subtext">
						Nesta seção você pode consultar mercadorias, e também realizar o cadastro das mesmas.
					</span>
				</div>
				<div className="container-mercadorias">
					<div className="header-chose-option d-flex pb-4">
						<label className="label-mercadorias">Escolha uma opção:</label>
						<select
							onChange={(e) => toggleCadMercadorias(e)}
							className="select-mode-mercadorias form-control"
						>
							<option value="0">Selecione uma opção</option>
							<option value="1">Cadastrar mercadoria</option>
							<option value="2">Consultar mercadorias</option>
							<option value="3">Cadastrar tipo de mercadoria</option>
						</select>
					</div>
					<div className="form-cad-mercadoria">
						{/* formulario cadastro de mercadorias */}
						{cadMercadorias && <CadastroMercadorias />}

						{/* tabela de consulta de mercadorias */}
						{consMercadorias && <ConsultaMercadoria />}

						{/* formulario cadastro de tipo de mercadoria */}
						{tipoMercadoria && <CadastroTipoMercadoria />}
					</div>
				</div>
			</div>
		</>
	)
}
