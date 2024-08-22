import React from 'react'
import Chart from 'react-apexcharts';
import GraficoMovimentacaoMensal from '../../../components/charts/movimentacaoMensal';
import GraficoPorMercadoria from '../../../components/charts/movimentoPorMercadoria';
import VerifyLogin from '../../../utils/auth'
import { useEffect } from 'react';
import './index.css'

export default function Dashboard() {

    useEffect(() => {
        VerifyLogin();
    })
    

    return(
        <>
            <GraficoMovimentacaoMensal />
            <GraficoPorMercadoria />
        </>
    )
}