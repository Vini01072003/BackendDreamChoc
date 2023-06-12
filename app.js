/*************************************************************************
 * Objetivo: API para interagir com o Banco de dados(GET,POST,DELETE,PUT)
 * Data: 06/06/2023
 * Autor: Gustavo Henrique
 * Versão: 2.0
 **************************************************************************/

/**************************************************************************
 * Express - depedencia do Node, que permite a integração entre o protocolo
 * http com o código.
 *          npm install express --save
 *          
 * Cors - Gerenciador de permições para protocolo HTTP :
 *          npm install cors --save
 * 
 * Body-parser - É uma dependencia que permite manipular dados pelo Body da
 * requisição
 *          npm install body-parser --save
 * 
 * Para relizar a conecção com o banco de dados iremos tilizar o Prisma
 *      npm install prisma --save
 *      npx prisma
 *      npx prisma init
 *      npm install @prisma/client 
 **************************************************************************/

 //Import do prisma se nessesario
 /***********************************************
  * import { PrismaClient } from '@prisma/client'
    const prisma = new PrismaClient()
  * 
  ***********************************************/

 // Import das bibliotecas
const express = require('express')
const cors = require('cors')
const bodyParse = require('body-parser')
const { request, response } = require('express')

//Criando uma const para realizar o processo de padronização de dados que vão chegar no body da requisição
const bodyJson = bodyParse.json()

const message = require('./controller/modulo/config.js')
const controllerDreamChock = require('./controller/controller_dream_chock.js')
const controllerDreamChockRh = require('./controller/controler_dream_chock_rh.js')

//Cria o objeto app utilizando a classe do express
const app = express()

//Configura as permições do cors
app.use((request, response, next) => {
    //Permições de origim de requisições
    response.header('Access-Control-Allow-Origin', '*')

    //Permições de metodos que serão utilizados na API
    response.header('Access-Control-Allow-Methods', 'GET,POST, PUT,DELETE,OPTIONS')

    //Define as permições para o cors
    app.use(cors())

    //Continua para a leitura dos EndPoints
    next()
})

//EndPoint usado para criar a conta do usuario
app.post('/v1/dream-chock/api/create-account/user', cors(), bodyJson, async function(request, response){
    let contentType = request.headers['content-type']

    if(String(contentType).toLocaleLowerCase() == 'application/json'){

        //Recebe os dados do body
        let dateBody = request.body

        let resultInsertUser = await controllerDreamChock.insertUser(dateBody)

        response.status(resultInsertUser.status)
        response.json(resultInsertUser)
    }else{
        return message.ERROR_INVALID_CONTENT_TYPE
    }

})

//EndPoint usado para verificar a conta do usuario
app.post('/v1/dream-chock/api/verify-account/user', cors(), bodyJson, async function(request, response){
    let contentType = request.headers['content-type']

    if(String(contentType).toLocaleLowerCase() == 'application/json'){

        //Recebe os dados do body
        let dataBody = request.body

        let resultVerifyAccount = await controllerDreamChock.verifyAccount(dataBody)

        response.status(resultVerifyAccount.status)
        response.json(resultVerifyAccount)
    }else{
        return message.ERROR_INVALID_CONTENT_TYPE
    }

})

//EndPoint usado para cadastrar os sequintes dados: nome, rg, cpf, ddd e numero de telefone. 
app.post('/v1/dream-chock/api/personal-data/user', cors(), bodyJson, async function(request, response){
    
    let contentType = request.headers['content-type']

    if(String(contentType).toLocaleLowerCase() == 'application/json'){

        let dataBody = request.body

        let resultDataPersonal = await controllerDreamChock.insertDataPersonal(dataBody)
        
        response.status(resultDataPersonal.status)
        response.json(resultDataPersonal)
    }else{
        return message.ERROR_INVALID_CONTENT_TYPE
    }
})

//EndPoint usado para cadastrar os dados do cartão
app.post('/v1/dream-chock/api/personal-data-payment/user', cors(), bodyJson, async function(request, response){
    
    let contentType = request.headers['content-type']

    if(String(contentType).toLocaleLowerCase() == 'application/json'){
        let dataBody = request.body

        console.log(dataBody)
        let resultDataPersonalPayment = await controllerDreamChock.insertDataPersonalPayment(dataBody)

        response.status(resultDataPersonalPayment.status)
        response.json(resultDataPersonalPayment)

    }else{
        return message.ERROR_INVALID_CONTENT_TYPE
    }
})



app.post('/v1/dream-chock/api/update-password/user', cors(), bodyJson, async function(request, response){

    let contentType = request.headers['content-type']

    if(String(contentType).toLocaleLowerCase() == 'application/json'){
        let dataBody = request.body

        let resultUpdatePassword= await controllerDreamChock.updatePasswordUser(dataBody)

        response.status(201)
        response.json(resultUpdatePassword)

    }else{
        return message.ERRO_REQUIRED_ID
    }

})

//Endpoint para verificar todos os dados registrados pelo usuario
app.get('/v1/dream-chock/api/all-data-register/user/:id', cors(), async function(request, response){

        let id = request.params.id
        let resultAllDataRegister = await controllerDreamChock.getAllDataRegisterUser(id)

        response.status(resultAllDataRegister.status)
        response.json(resultAllDataRegister)

})

//Endpoint para verificar todas as doações
app.get('/v1/dream-chock/api/all-data-donation/rh', cors(), async function(request, response){


    let resultAllDonation = await controllerDreamChockRh.getAllDonations()

    response.status(resultAllDonation.status)
    response.json(resultAllDonation)

})

//Endpoint registrar o funcionario
app.post('/v1/dream-chock/api/create-account/employee', cors(), bodyJson, async function(request, response){
    let contentType = request.headers['content-type']

    if(String(contentType).toLocaleLowerCase() == 'application/json'){

        //Recebe os dados do body
        let dateBody = request.body

        let resultInsertEmployee = await controllerDreamChockRh.insertEmployee(dateBody)

        response.status(201)
        response.json(resultInsertEmployee)
    }else{
        return message.ERROR_INVALID_CONTENT_TYPE
    }

})

//Endpoint registrar o donativo do usuario
app.post('/v1/dream-chock/api/register-donation/user', cors(), bodyJson, async function(request, response){
    let contentType = request.headers['content-type']

    if(String(contentType).toLocaleLowerCase() == 'application/json'){

        //Recebe os dados do body
        let dateBody = request.body

        let resultDonation = await controllerDreamChock.insertAllInfDonation(dateBody)

        response.status(resultDonation.status)
        response.json(resultDonation)
    }else{
        return message.ERROR_INVALID_CONTENT_TYPE
    }

})

//EndPoint usado para verificar a conta do funcionario
app.post('/v1/dream-chock/api/verify-account/rh', cors(), bodyJson, async function(request, response){
    let contentType = request.headers['content-type']

    if(String(contentType).toLocaleLowerCase() == 'application/json'){

        //Recebe os dados do body
        let dataBody = request.body

        let resultVerifyAccount = await controllerDreamChockRh.verifyAccount(dataBody)

        response.status(resultVerifyAccount.status)
        response.json(resultVerifyAccount)
    }else{
        return message.ERROR_INVALID_CONTENT_TYPE
    }

})


//EndPoint responsavel por deletar funcionario
app.delete('/v1/dream-chock/api/delete-account/employee', async function(request, response){

        let email = request.query.email

        let resultDeleteEmployee= await controllerDreamChockRh.deleteAccount(email)

        response.status(resultDeleteEmployee.status)
        response.json(resultDeleteEmployee)

})


app.listen(8080, function(){
    console.log("Servidor aguardando requisições na porta 8080")
})