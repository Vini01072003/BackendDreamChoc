/**********************************************************************************
 * Objetivo: Implementar a regra de negócio entre o app e a model. Essa controler
 * é responsavel por validadar os dados dos endPoints e direciona para o Banco.
 * Data: 27/05/2023
 * Versão: 1.0
 **********************************************************************************/

//Import do arquivo global para ter acesso a comunicação com o banco de dados Mysql
const dreamChockDAO = require('../model/DAO/dream-chockDAO.js')

const message = require('./modulo/config.js')

//Função responsavel por verificar se os dados estão corretos para cadastrar o funcionario
const insertEmployee = async function (dateBody) {

    if (
        dateBody.name == '' || dateBody.name == null || dateBody.name == undefined || dateBody.name < 2 ||
        dateBody.email == '' || dateBody.email == null || dateBody.email == undefined ||
        dateBody.password == '' || dateBody.password == null || dateBody.password == undefined || dateBody.password < 5 ||
        dateBody.photo_url == ''|| dateBody.photo_url == null || dateBody.photo_url == undefined ||
        isNaN(dateBody.id_administrator) || dateBody.id_administrator == null
    ) {
        return message.ERRO_REQUIRED_DATA_EMPLOYEE
    } else {

        //Envia os dados para a model inserir no banco de dados
        let status = await dreamChockDAO.insertEmployee(dateBody)
        if (status.error == true) {
            return message.ERROR_INVALID_EMAIL
        } else {
            if (status) {
                let dateJson = {}

                dateJson.status = message.CREATED_ITEM.status
                dateJson.user = message.CREATED_ITEM.message

                return dateJson
            } else {
                return message.ERRO_INTERNAL_SERVER
            }
        }
    }
}

const verifyAccount = async function (dateBody) {
    if (
        dateBody.email == '' || dateBody.email == null || dateBody.email == undefined ||
        dateBody.password == '' || dateBody.password == null || dateBody.password == undefined
    ) {
        return message.ERROR_REQUIRE_EMAIL_PASSWORD
    } else {

        let status = await dreamChockDAO.verifyAccountEmployee(dateBody)

        if (status == true) {

            let dataJson = {
                status: message.VERIFITY_USER.status,
                message: message.VERIFITY_USER.message,
                obs: 'Administrador'
            }

            return dataJson 

        }else if(typeof status == 'object'){
            let dateJson = {
                status: message.VERIFITY_USER.status,
                message: message.VERIFITY_USER.message,
                obs: 'Funcionario',
                id_register_user: status[0].id,
                name_user: status[0].nome,
                photo_url: status[0].foto_url
            }

            return dateJson
        } else {
            return message.ERROR_REQUIRE_VERITY_EMAIL_PASSWORD
        }
    }
}

const deleteAccount = async function (email) {
    if (
        email == '' || email == null || email == undefined
    ) {
        return message.ERRO_DELETE_EMPLOYEE
    } else {

        let status = await dreamChockDAO.deleteEmployee(email)

        if (status) {

            //Retorna o primerio elemento da array
            let dateJson = {
                status: message.DELETE_EMPLOYEE.status,
                message: message.DELETE_EMPLOYEE.message,
            }

            return dateJson
        } else {
            return message.ERROR_NOT_FOUND
        }
    }
}

const getAllDonations = async function(){

    let status = await dreamChockDAO.getAllDonation()

    if(status){
         dataJson = {
            status : message.ALL_DONATION.status,
            message: status

         }
         return dataJson
    }else{
        return message.ERROR_NOTFOUND_DONATION
    }
}

module.exports = {
    insertEmployee,
    verifyAccount,
    deleteAccount,
    getAllDonations
}