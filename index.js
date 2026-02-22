
const host = '0.0.0.0';
const porta = 3000;

import express from "express";
const aplicacao = express();

aplicacao.get("/", (requisicao, resposta) => {

    const idadedFuncionario = requisicao.query.idade;
    const salarioBaseFuncionario = requisicao.query.salario_base;
    const anoContratacaoFuncionario = requisicao.query.anoContratacao;
    const matriculaFuncionario = requisicao.query.matricula;

    if (!idadeFuncionario || Number(idadeFuncionario) <= 16) {
        return resposta.send("Erro: a idade deve ser maior que 16 anos.");
    }

    if (!salarioBaseFuncionario || isNaN(salarioBaseFuncionario)) {
        return resposta.send("Erro: o salário base informado é inválido.");
    }

    if (!anoContratacaoFuncionario || Number(anoContratacaoFuncionario) <= 1960) {
        return resposta.send("Erro: o ano de contratação deve ser maior que 1960.");
    }

    if (!matriculaFuncionario || Number(matriculaFuncionario) <= 0) {
        return resposta.send("Erro: a matrícula deve ser um número inteiro maior que zero.");
    }

    const idadeConvertida = Number(idadeFuncionario);
    const salarioBaseConvertido = Number(salarioBaseFuncionario);
    const anoAtual = new Date().getFullYear();
    const tempoNaEmpresa = anoAtual - Number(anoContratacaoFuncionario);

    let percentualReajuste = 0;
    let valorAjusteFixo = 0;

    if (idadeConvertida >= 18 && idadeConvertida <= 39) {

        if (sexoFuncionario === "M") {
            percentualReajuste = 0.10;
            valorAjusteFixo = tempoNaEmpresa <= 10 ? -10 : 17;
        } else {
            percentualReajuste = 0.08;
            valorAjusteFixo = tempoNaEmpresa <= 10 ? -11 : 16;
        }

    } else if (idadeConvertida >= 40 && idadeConvertida <= 69) {

        if (sexoFuncionario === "M") {
            percentualReajuste = 0.08;
            valorAjusteFixo = tempoNaEmpresa <= 10 ? -5 : 15;
        } else {
            percentualReajuste = 0.10;
            valorAjusteFixo = tempoNaEmpresa <= 10 ? -7 : 14;
        }

    } else if (idadeConvertida >= 70 && idadeConvertida <= 99) {

        if (sexoFuncionario === "M") {
            percentualReajuste = 0.15;
            valorAjusteFixo = tempoNaEmpresa <= 10 ? -15 : 13;
        } else {
            percentualReajuste = 0.17;
            valorAjusteFixo = tempoNaEmpresa <= 10 ? -17 : 12;
        }
    }

    const salarioReajustado =
        salarioBaseConvertido +
        (salarioBaseConvertido * percentualReajuste) +
        valorAjusteFixo;

    resposta.send(`
        <h2>Dados do Funcionário</h2>

        <p>Matrícula: ${matriculaFuncionario}</p>
        <p>Idade: ${idadeFuncionario}</p>
        <p>Sexo: ${sexoFuncionario}</p>
        <p>Salário Base: R$ ${salarioBaseConvertido.toFixed(2)}</p>
        <p>Tempo na Empresa: ${tempoNaEmpresa} anos</p>

        <h2>
            Salário Reajustado: R$ ${salarioReajustado.toFixed(2)}
        </h2>
    `);
});

aplicacao.listen(3000, () => {
    console.log("Aplicação em execução no endereço http://localhost:3000");
});


