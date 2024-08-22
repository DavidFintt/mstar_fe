import React from 'react'
import Chart from 'react-apexcharts';
import GraficoMovimentacaoMensal from '../../../components/charts/movimentacaoMensal';
import GraficoPorMercadoria from '../../../components/charts/movimentoPorMercadoria';
import './index.css'

export default function Dashboard() {

    return(
        <>
            <GraficoMovimentacaoMensal />
            <GraficoPorMercadoria />
        </>
    )
}