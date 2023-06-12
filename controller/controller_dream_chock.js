/**********************************************************************************
 * Objetivo: Implementar a regra de negócio entre o app e a model. Essa controler
 * é responsavel por validadar os dados dos endPoints e direciona para o Banco.
 * Data: 06/06/2023
 * Versão: 2.0
 **********************************************************************************/

//Import do arquivo global para ter acesso a comunicação com o banco de dados Mysql
const dreamChockDAO = require('../model/DAO/dream-chockDAO.js')

const message = require('./modulo/config.js')

//Função responsavel por verificar se os dados estão corretos para cadastrar o usuario
const insertUser = async function (dateBody) {

    if (
        dateBody.name == '' || dateBody.name == null || dateBody.name == undefined || dateBody.name < 2 ||
        dateBody.email == '' || dateBody.email == null || dateBody.email == undefined ||
        dateBody.password == '' || dateBody.password == null || dateBody.password == undefined || dateBody.password < 5 ||
        isNaN(dateBody.id_administrator) || dateBody.id_administrator == null
    ) {
        return message.ERRO_REQUIRED_DATA
    } else {

        //Envia os dados para a model inserir no banco de dados
        let status = await dreamChockDAO.insertUser(dateBody)

        // Se o trecho de código do stutus de erro for igual a verdadeiro ele retorna a menssagem do config.js ERROR_INVALID_EMAIL  
        if (status.error == true) {
            return message.ERROR_INVALID_EMAIL


        //: Se o valor da propriedade error não for true, o código continua aqui. Ele verifica se status é avaliado como verdadeiro (ou seja, não é nulo, vazio, falso ou zero). Se for verdadeiro, o código continua dentro desse bloco.

        } else {
            if (status) {
                let dateJson = {}
                //let newUserId = await dreamChockDAO.selectLastId()
                //dateBody.id = newUserId

                dateJson.status = message.CREATED_ITEM.status
                dateJson.user = message.CREATED_ITEM.message
                //dateJson.id = dateBody

                return dateJson
            } else {
                return message.ERRO_INTERNAL_SERVER
            }
        }
    }
}

// Unidade de memória que recebe uma função asincrona no objeto datebody
const verifyAccount = async function (dateBody) {
    //Tratativas de erro na entrada de dados de email e senha
    if (
        dateBody.email == '' || dateBody.email == null || dateBody.email == undefined ||
        dateBody.password == '' || dateBody.password == null || dateBody.password == undefined
    ) {
        return message.ERROR_REQUIRE_EMAIL_PASSWORD
    } else {

        let status = await dreamChockDAO.verifyAccountUser(dateBody)

        if (status) {

            //Retorna o primerio elemento da array
            let dateJson = {
                status: message.VERIFITY_USER.status,
                message: message.VERIFITY_USER.message,
                id_register_user: status[0].id,
                name_user: status[0].nome
            }

            return dateJson
        } else {
            return message.ERROR_REQUIRE_VERITY_EMAIL_PASSWORD
        }
    }
}

const insertDataPersonal = async function (dataBody) {

    if (
        dataBody.data_user.name_user == '' || dataBody.data_user.name_user == undefined || dataBody.data_user.name_user == null ||
        dataBody.data_user.rg == '' || dataBody.data_user.rg == null || dataBody.data_user.rg == undefined ||
        dataBody.data_user.cpf == '' || dataBody.data_user.cpf == null || dataBody.data_user.cpf == undefined ||
        isNaN(dataBody.data_user.id_register) || dataBody.data_user.id_register == '' || dataBody.data_user.id_register == null
    ) {
        return message.ERRO_REQUIRED_DATA_PERSONAL
    } else {
        let contactsEmpty = false
        dataBody.data_user.data_contacts.forEach((contact) => {
            if (
                contact.ddd == '' || contact.ddd == null || contact.ddd == undefined ||
                contact.number_phone == '' || contact.number_phone == null || contact.number_phone == undefined
            ) {
                contactsEmpty = true
            }
        })

        if (contactsEmpty) {
            return message.ERRO_REQUIRED_DATA_CONTACTS
        } else {

            let status = await dreamChockDAO.insertDataPersonalUser(dataBody)

            if (status.error == true) {
                return message.ERROR_INVALID_REGISTER
            } else if (status.id == false) {
                return message.ERRO_REQUIRED_ID
            } else if (status == false) {
                return message.ERRO_INTERNAL_SERVER
            } else {

                let dataJson = {
                    status: message.SAVE_DATA_USER.status,
                    id_data_personal: status.id_Data_personal,
                    name: status.name
                }

                return dataJson

            }
        }
    }
}

const insertDataPersonalPayment = async function (dataBody) {

    if (
        dataBody.number_card === '' || dataBody.number_card === null || dataBody.number_card === undefined || dataBody.number_card.length < 13 || dataBody.number_card.length > 20 ||
        dataBody.name_user === '' || dataBody.name_user === null || dataBody.name_user === undefined || dataBody.name_user.length < 4 ||
        isNaN(dataBody.month) || typeof dataBody.month == 'string' ||
        isNaN(dataBody.year) || typeof dataBody.year == 'string' ||
        dataBody.cvv.length > 3 || dataBody.cvv == null || dataBody.cvv == undefined ||
        isNaN(dataBody.id_data_personal) || typeof dataBody.id_data_personal == 'string' || dataBody.id_Data_personal === null || dataBody.id_data_personal == undefined
    ) {
        return message.ERRO_DATA_CARD
    } else {
        let status = await dreamChockDAO.insertDataPersonalCard(dataBody)
        if (status.error == true) {
            return message.ERRO_REGISTER_DATA_CARD
        } else if (status.id == false) {

            return message.ERRO_REGISTER_DATA_CARD_BY_ID
        } else if (status) {

            let dataJson = {
                status: message.SAVE_DATA_USER_CARD.status,
                message: message.SAVE_DATA_USER_CARD.message
            }
            return dataJson
        } else {
            return message.ERRO_INTERNAL_SERVER
        }
    }

}

const updatePasswordUser = async function (dataBody) {

    if (
        dataBody.cpf == '' || dataBody.cpf == null || dataBody.cpf == undefined ||
        dataBody.email == '' || dataBody.email == null || dataBody.email == undefined ||
        dataBody.new_password == '' || dataBody.new_password == null || dataBody.new_password == undefined
    ) {
        return message.ERRO_REQUIRED_UPDATE_PASSWORD
    } else {

        let status = await dreamChockDAO.updatePasswordUser(dataBody)

        if (!status) {
            return message.ERRO_UPDATE_INCORRECTS_USER
        } else {
            return message.UPDATED_ITEM
        }
    }
}

const getAllDataRegisterUser = async function (id) {

    if(id == null || id == undefined || isNaN(id)) {
        return message.ERRO_REQUIRED_ID
    }else{

        let status = await dreamChockDAO.getAllDataRegisterUser(id)
        if(status){
            let dataJson = {
                status: message.VERIFITY_USER.status,
                message: status
            }

            return dataJson
        }else{
            return message.ERRO_REQUIRED_ID
        }
    }
}

const insertAllInfDonation = async function(dataBody){
    if(dataBody.name =='' || dataBody.name == undefined || dataBody.name == null ||
    dataBody.email == '' || dataBody.email == undefined || dataBody.email == null ||
    dataBody.donation == '' || dataBody.donation == undefined || dataBody.donation == null
    ){
        return message.ERRO_REQUIRED_DATA_DONATION
    }else{

        let status = await dreamChockDAO.insertDonationOfUser(dataBody)
        if(status == true){
            return message.SAVE_DATA_USER
        }else{
            return message.ERRO_REQUIRED_ID
        }
    }
}
    module.exports = {
        insertUser,
        verifyAccount,
        insertDataPersonal,
        insertDataPersonalPayment,
        updatePasswordUser,
        getAllDataRegisterUser,
        insertAllInfDonation,
    }