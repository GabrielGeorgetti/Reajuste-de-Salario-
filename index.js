

    import express from "express";

     const host = '0.0.0.0';
     const porta = 3000;


    const servidor = express();

    servidor.get('/tabuada', (requisicao, resposta)=> {

     const numero = number(requisicao.query.numero);
     const sequencia= number(requisicao.query.sequencia);

     if (!numero || !sequencia) {
          resposta.send(`
              <!Doctype html>
              <html lang="pt-br">
              <head>
                    <meta charset="UTF-8">
                    <meta http-equiv="X-UA-Compatible" content= "IE=edge">
                    <meta name="viewport" content= "width=device-width, initial-scale=1.0">
                    <title>Tabuada</title>
         
              </head>
              <body>
               <h1>Tabuada</h1>
               <h2> Por favor, informe a sequencia </h2>
               </body>
               </html>
              
          `);
     }
     else{
          resposta.write(`
               <Doctype html>
              <html lang="pt-br">
              <head>
                    <meta charset="UTF-8">
                    <meta http-equiv="X-UA-Comptible" content= "IE=edge">
                    <meta name="viewport" content= "width=device=width, initial-scale=1.0">
                    <title>Tabuada</title>
         
              </head>
              <body>
               <h1>Tabuada do numero ${numero} até a sequencia ${sequencia} </h1>
               <ul>
               
               `);

          for (let i =0; i <= sequencia; i++) {
               resposta.write(`<li> ${i} x ${numero} = ${i * numero}</li> `);
          }

          resposta.write(`
               </ul>
               </body>
               </html>
               `);

          resposta.end();
     }
     
     console.log("requisição / tabuada");

});



//servidor.get('/inicio', (idade) =>{
 //          idade = Number(requisicao.query.idade);
 //          salario_basse = Number(requisicao.query.idade)
 //   });

    servidor.listen(porta, host, () => {
     console.log(`Servidor escutando em http://${host} : ${porta}`);
     });