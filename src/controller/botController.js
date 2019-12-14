const triagemCollection = require("../model/triagemSchema")

/*botbuilder v3, o atual é o v4*/
const builder = require('botbuilder');
const moment = require('moment');
const express = require("express")


/*caso eu queira disponibilizar o meu codigo*/

let connector = new builder.ChatConnector({
    appId:"",
    appPassword:""
});
/*variavel bot*/

let Alda = new builder.UniversalBot(connector);

// luis

let recognizer = new builder.LuisRecognizer(process.env.LUIS_MODEL_URL);

/*intenções do luiz - conenctando ao serviço congnitivo da microsoft*/

let intents = new builder.IntentDialog({ recognizers: [recognizer] });


/* --------intenções do luis-------------------------------- */
/* --------abaixo são as respostas do bot-------------------------------- */

/* 1 intenção - saudar */
intents.matches('Saudar', (session, results) => {
    session.send('Olá! você está bem? ');
});

/* 1 intenção - pedir */
// intents.matches('consulta', [
//     (session, args, next) => {
//         var consulta = [
//             "Psiquiatra",
//             "Psicologo",
//             "Psicologo comportamental",
//             "Analise",
//             "Terapia de casal"
//         ];
//         let entityconsulta = builder.EntityRecognizer.findEntity(args.entities, 'consulta')
      
//         //fazendo match da escolha da consulta do usuario
//         if(entityconsulta){
//             var match = builder.EntityRecognizer.findBestMatch(consulta, entityconsulta.entity);
//         }
//         //se diferente  envie essa mensagem com as consultas
//         if (!match) {
//             builder.Prompts.choice(session, 'Tudo bem, já que voce prefere falar com um psicologo e não bater uma papo comigo, escolha uma especialidade abaixo:  ', consulta)
//         } else{
//             next({response: match});
//         }
//     },

//     /* horario que a consulta vai chegar */
//     (session, results) => {
//         if (results.response){
//             var time = moment().add(30, 'm');

//             session.dialogData.time = time.format('HH:mm');
//             session.send("Perfeito sua consulta com **%s** esta marcada para  as **%s**", results.response.entity, session.dialogData.time);
//         } else{
//             session.send('sem problemas!');
//         }
//     }
// ]);

//quando a pessoa estiver triste e falar qu esta triste

intents.matches('Sentimento negativo', (session, results) => {
    session.send('Me conte o que está acontecendo com você?');
});

//intenção  ex verificar - ela vem depois que a pessoa fala dos problemas

intents.matches('Soluçõoes para tristeza', (session, results) => {
    session.send('Não se desespere, não seja ansiosa, pense no presente e continue nele. voce ficara bem, tudo passa');
});

//intenção de preposições ou continuar acreditando que esta tudo ruim

intents.matches('Desacreditada da vida', (session, results) => {
    session.send('Estou aqui para te escutar e te ajudar, não irei embora até voce melhorar. Mas antes de voce falar algo, peço que respire fundo e pense em tudo que voce passou e continua firme e forte');
   

});

//quando a pessoa falar algo que não ta no luis
let teste = intents.onDefault(
   builder.DialogAction.send('Lembre-se que sou apenas a Alda, sua amiga BOT, não sou a Jean Grey para decifrar o que voce disse')
  );

//CRUD---------------------------------- intenção criar

intents.matches(/Criar Consulta.*/i, (session, results) => {
    const text = session.message.text.replace(/Criar Consulta/i, '').trim()

    console.log(`TEXTO: ${text}`)
const splitByComma = text.split(",")

    if (splitByComma.length < 3) {
        session.send('Comando inválido. O formato do comando é "Criar Consulta nome,cidade,email"')
    } else {
        const [nome, cidade, email] = splitByComma
        const tria = (`nome: ${nome}, cidade: ${cidade}, email: ${email}`)
         //esse console basicamente faz isso:Criar Consulta camila, são paulo, camila@s.com >  console.log(tria)
         // const triagem = new triagemCollection(tria)
         // console.log(triagem)
         
         const triagem = new triagemCollection({nome, cidade, email})

        //  const triagem = JSON.stringify(tri);
        //  console.log (typeof objeto)

        //  console.log(objeto)
         //resultado esperado > {"_id":"5ded46f944f87b2778c20204","nome":"camila","cidade":"são paulo","email":" camil@s.com"}

        triagem.save((error) => {
            if (error){
                return (error)
            }else{
                return (triagem)
            }
        })
        
        session.send('Consulta criada' + triagem)
    }});
        
        // validando os dados com o Schema 
        // const triagem = new triagemCollection({name, city, email}) => (){})
        // salvando o triagem caso não dê erros
        
    

//CRUD intenção atualizar
intents.matches('Atualizar', (session, results) => {
    session.send('Ok, irei atualizar um consulta para voce')
})


//CRUD intenção deletar
intents.matches('Deletar', (session, results) => {
    session.send('Ok, irei deletar um consulta para voce')
})

//Crud intenção consultar todos
intents.matches('Consultar todos', (session, results) => {
    session.send('Ok, irei consultar todas as consultas para voce')
})


//dialogo
Alda.dialog('/', intents);


var listen = connector.listen();

module.exports = 
    listen,
    triagemCollection


