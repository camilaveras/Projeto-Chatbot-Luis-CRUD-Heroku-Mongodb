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
    session.send('Olá, você está bem? ');
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
    session.send('Me conte porque esta sentindo isso?');
});

//intenção  ex verificar - ela vem depois que a pessoa fala dos problemas

intents.matches('Soluções para tristeza', (session, results) => {
    session.send('Respire fundo, tudo passa, a dor, a ansiedade, o sofrimento, o segredo é aprender a lidar com as adversidades');
});

//intenção de preposições ou continuar acreditando que esta tudo ruim

intents.matches('Desacreditada da vida', (session, results) => {
    session.send('Entendo que o que está vivendo é dificl, porém trabalharemos juntas para melhorar a sua situação. Agora peço que respire fundo e pense em tudo que você passou e continua firme e forte');
   

});

//quando a pessoa falar algo que não ta no luis
let teste = intents.onDefault(
   builder.DialogAction.send('Lembre-se que sou apenas a Ada, sua amiga BOT, não sou a Jean Grey para decifrar o que você disse')
  );

//CRUD----------------------------------CRIANDO CONSULTA PELO BOT

intents.matches(/Criar Consulta.*/i, (session, results) => {
    const text = session.message.text.replace(/Criar Consulta/i, '').trim()

    console.log(`TEXTO: ${text}`)
const splitByComma = text.split(",")

    if (splitByComma.length < 3) {
        session.send('Comando inválido. O formato do comando é "Criar Consulta nome,cidade,email,bairroconsulta"')
    } else {
        const [nome, cidade, email, bairroconsulta] = splitByComma
        const tria = (`nome: ${nome}, cidade: ${cidade}, email: ${email}, bairroconsulta: ${bairroconsulta}`) 
         const triagem = new triagemCollection({nome, cidade, email, bairroconsulta})

        triagem.save((error) => {
            if (error){
                console.log(error)
                return (error)
            }else{
                return ("sucess")
            }
        })
        
        session.send('Consulta criada com sucesso, esse curso do reprograma faz milagre  ' + triagem)
    }});
        

//----------------------CRUD intenção atualizar
intents.matches('Atualizar', (session, results) => {
    session.send('Ok, irei atualizar um consulta para voce')
})


//-----------------------CRUD intenção deletar
intents.matches('Deletar', (session, results) => {
    session.send('Ok, irei deletar um consulta para voce')
})

//-----------------------Crud intenção consultar todos
intents.matches('Consultar todos', (session, results) => {
    session.send('Ok, irei consultar todas as consultas para voce')
})


//--------------------dialogo
Alda.dialog('/', intents);


var listen = connector.listen();

module.exports = 
    listen

