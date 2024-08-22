import React from 'react'
import { useState, useEffect } from 'react'
import MovimentacoesService from '../../../services/movimentacoes'
import Chart from 'react-apexcharts';

export default function GraficoMovimentacaoMensal() {
	const movimentacoesService = new MovimentacoesService()

	const [entradas, setEntradas] = useState(false)
	const [saidas, setSaidas] = useState(false)

	const [entradaData, setEntradaData] = useState([])
	const [saidaData, setSaidaData] = useState([])

	useEffect(() => {
		loadEntradas()
		loadSaidas()
	}, [])

	const loadEntradas = async () => {
		try {
			const response = await movimentacoesService.loadEntrada(entradaData)
			response.data.map((el) => {
				el.data = new Date(el.data).toLocaleDateString('pt-BR')
			})
			if (response.status === 200) {
				setEntradaData(response.data)
			}
		} catch (error) {
			console.log(error)
		}
	}

	const loadSaidas = async () => {
		try {
			const response = await movimentacoesService.loadSaida(saidaData)
			response.data.map((el) => {
				el.data = new Date(el.data).toLocaleDateString('pt-BR')
			})
			if (response.status === 200) {
				setSaidaData(response.data)
			}
		} catch (error) {
			console.log(error)
		}
	}
    const entradaSeries = entradaData.map(item => item.quantidade);
    const saidaSeries = saidaData.map(item => item.quantidade);
    const categories = entradaData.map(item => item.data);

    const chartOptions = {
        chart: {
            id: 'movimentacoes-chart',
        },
        xaxis: {
            categories: categories,
        },
        stroke: {
            curve: 'smooth',
        },
        title: {
            text: 'Movimentações de Mercadorias',
            align: 'left',
        },
    };

    const chartSeries = [
        {
            name: 'Entradas',
            data: entradaSeries,
        },
        {
            name: 'Saídas',
            data: saidaSeries,
        },
    ];

    return(
        <>
            <div id="dashboard-main">
            <h2>Dashboard de Movimentações</h2>
            <div className="chart-container">
                <Chart
                    options={chartOptions}
                    series={chartSeries}
                    type="line" 
                    width="100%"
                    height="400"
                />
            </div>
            </div>
        </>
    )
}