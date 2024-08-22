import React, { useState, useEffect } from 'react'
import Chart from 'react-apexcharts'
import MovimentacoesService from '../../../services/movimentacoes'

export default function Dashboard() {
	const movimentacoesService = new MovimentacoesService()

	const [entradaData, setEntradaData] = useState([])
	const [saidaData, setSaidaData] = useState([])

	useEffect(() => {
		loadEntradas()
		loadSaidas()
	}, [])

	const loadEntradas = async () => {
		try {
			const response = await movimentacoesService.loadEntrada()
			if (response && response.status === 200) {
				setEntradaData(response.data)
			}
		} catch (error) {
			console.log(error)
		}
	}

	const loadSaidas = async () => {
		try {
			const response = await movimentacoesService.loadSaida()
			if (response && response.status === 200) {
				setSaidaData(response.data)
			}
		} catch (error) {
			console.log(error)
		}
	}

	const entradaSeries = entradaData.map((item) => item.quantidade)
	const saidaSeries = saidaData.map((item) => item.quantidade)
	const categorias = [
		...new Set([
			...entradaData.map((item) => item.nome_mercadoria),
			...saidaData.map((item) => item.nome_mercadoria),
		]),
	]

	const chartOptions = {
		series: [
			{
				name: 'Entradas',
				data: entradaSeries,
			},
			{
				name: 'Saídas',
				data: saidaSeries,
			},
		],
		chart: {
			type: 'bar',
			height: 350,
		},
		plotOptions: {
			bar: {
				horizontal: false,
				columnWidth: '55%',
				endingShape: 'rounded',
			},
		},
		dataLabels: {
			enabled: false,
		},
		stroke: {
			show: true,
			width: 2,
			colors: ['transparent'],
		},
		xaxis: {
			categories: categorias,
		},
		yaxis: {
			title: {
				text: 'Quantidade',
			},
		},
		fill: {
			opacity: 1,
		},
		tooltip: {
			y: {
				formatter: function (val) {
					return val + ' unidades'
				},
			},
		},
	}

	return (
		<div id="dashboard-main">
			<h2>Movimentações por mercadoria</h2>
			<div className="chart-container">
				<Chart options={chartOptions} series={chartOptions.series} type="bar" height={350} />
			</div>
		</div>
	)
}
