/**********************************************************************************
 * Objetivo: Realizar a interação do controller_dream_chock com o banco de dados
 * Data: 22/05/2023
 * Versão: 1.0
 **********************************************************************************/

//Import da biblioteca do prisma cliente (Responsavel por manipuladr os dados no script)
const { PrismaClient } = require("@prisma/client")

//Instancia da classe do PrismaCliente
const prisma = new PrismaClient()

//Função para inserir o cadastro do usuario no banco de dados
const insertUser = async function (dateUser) {

    //prisma.$queryRawUnsafe(sql): Essa função é usada quando você deseja executar uma consulta de leitura (SELECT) no banco de dados;

    //prisma.$executeRawUnsafe(sql): Essa função é usada quando você deseja executar uma consulta de gravação (INSERT, UPDATE, DELETE) no banco de dados;

    //Verifica se o email ja foi cadastrado
    //A função COUNT(*) é usada para contar todas as linhas da tabela tbl_cadastro_doador que possuem o valor do campo email igual a 'email_usuario', se for 0 Ainda nao foi cadastrado o email
    let checkEmailExistsQuery = `SELECT COUNT(*) AS count FROM tbl_cadastro_doador WHERE email ='${dateUser.email}'`;
    let emailExistsResult = await prisma.$queryRawUnsafe(checkEmailExistsQuery)

    if (emailExistsResult && emailExistsResult[0].count > 0) {
        return {
            error: true
        }

    } else {
        //Script SQL para cadastrar o usuario no banco
        let sql = `insert into tbl_cadastro_doador(
        nome,
        email,
        senha,
        id_administrador
    )values(
        '${dateUser.name}',
        '${dateUser.email}',
        '${dateUser.password}',
        ${dateUser.id_administrator}
    )`

        // Insert, update ou delet se utiliza o $Execute se for esperar retorno de dados $Query
        //Excuta o script no banco de dados e retorna se deu certo ou nao o insert aluno

        let result = await prisma.$executeRawUnsafe(sql)
        if (result) {
            return true
        } else {
            return false
        }
    }

}

const verifyAccountUser = async function (dateBody) {

    let sql = `SELECT id,nome FROM tbl_cadastro_doador WHERE email ='${dateBody.email}' AND senha ='${dateBody.password}'`

    let result = await prisma.$queryRawUnsafe(sql)

    if (result.length === 0) {
        return false
    } else {
        return result
    }
}

const selectLastId = async function () {


    //Script para retorna apenas o ultimo registro inserido na tabela
    let sql = 'select id from tbl_cadastro_doador order by id desc limit 1'

    let response = await prisma.$queryRawUnsafe(sql)

    //Verifica se a array rem pelo menos um elemento
    if (response.length > 0) {

        //response[0].id retorna o valor da propriedade id do primeiro elemento do array response
        return response
    } else {
        return false
    }
}

const insertDataPersonalUser = async function (dataPersonalUser) {
    // Verifica se a chave estrangeira id_data_personal existe na tabela tbl_cadastro_doador
    let checkIdUser = `SELECT COUNT(*) AS count FROM tbl_cadastro_doador where id =${dataPersonalUser.data_user.id_register}`
    let resultVerifyId = await prisma.$queryRawUnsafe(checkIdUser)

    if (resultVerifyId && resultVerifyId[0].count > 0) {

        let checkIdCadastro = `SELECT COUNT(*) AS count FROM tbl_dado_pessoal_doador WHERE id_cadastro = ${dataPersonalUser.data_user.id_register}`;
        let idExistsResult = await prisma.$queryRawUnsafe(checkIdCadastro)

        if (idExistsResult && idExistsResult[0].count > 0) {
            return {
                error: true
            }
        } else {
            //Script SQL para cadastrar os dados perssoais do usuario
            let sql = `insert into tbl_dado_pessoal_doador(
        nome,
        rg,
        cpf,
        id_cadastro
    )values(
        '${dataPersonalUser.data_user.name_user}',
        '${dataPersonalUser.data_user.rg}',
        '${dataPersonalUser.data_user.cpf}',
        ${dataPersonalUser.data_user.id_register}
    )`

            let result = await prisma.$executeRawUnsafe(sql)

            if (result) {

                let idDadoPessoalDoador = `select id from tbl_dado_pessoal_doador where id_cadastro = ${dataPersonalUser.data_user.id_register}`
                let response = await prisma.$queryRawUnsafe(idDadoPessoalDoador)
                let id = response[0].id

                let sqlContacts = `insert into tbl_numero_telefone(
            ddd,
            numero_telefone,
            id_dado_pessoal_doador
        )values(
            '${dataPersonalUser.data_user.data_contacts[0].ddd}',
            '${dataPersonalUser.data_user.data_contacts[0].number_phone}',
            ${id}
        )`

                let resultContacts = await prisma.$executeRawUnsafe(sqlContacts)

                if (resultContacts) {
                    return {
                        id_Data_personal: id,
                        name: dataPersonalUser.data_user.name_user
                    }
                }

            } else {
                return false
            }
        }
    } else {
        return {
            id: false
        }
    }
}

const insertDataPersonalCard = async function (dataCard) {

    // Verifica se a chave estrangeira id_data_personal existe na tabela tbl_cadastro_doador
    let checkDataPersonalExistsQuery = `SELECT COUNT(*) AS count FROM tbl_cadastro_doador WHERE id =${dataCard.id_data_personal}`
    let dataPersonalExistsResult = await prisma.$queryRawUnsafe(checkDataPersonalExistsQuery)

    if (dataPersonalExistsResult && dataPersonalExistsResult[0].count > 0) {

        let checkDataCardExistsQuery = `SELECT COUNT(*) AS count FROM tbl_cartao WHERE id_dado_pessoal_doador =${dataCard.id_data_personal}`;
        let cardExistsResult = await prisma.$queryRawUnsafe(checkDataCardExistsQuery)

        if (cardExistsResult && cardExistsResult[0].count > 0) {

            return {
                error: true
            }

        } else {
            //Script SQL para cadastrar o usuario no banco
            let sql = `insert into tbl_cartao(
        numero_cartao,
        nome,
        ano,
        mes,
        cvv,
        id_dado_pessoal_doador
    )values(
        '${dataCard.number_card}',
        '${dataCard.name_user}',
        ${dataCard.year},
        ${dataCard.month},
        '${dataCard.cvv}',
        ${dataCard.id_data_personal}
    )`

            // Insert, update ou delet se utiliza o $Execute se for esperar retorno de dados $Query
            //Excuta o script no banco de dados e retorna se deu certo ou nao o insert aluno

            let result = await prisma.$executeRawUnsafe(sql)
            if (result) {
                return true
            } else {
                return false
            }
        }
    } else {
        return {
            id: false
        }
    }
}

const updatePasswordUser = async function (dataBody) {

    let sqlEmail = `SELECT id, email FROM tbl_cadastro_doador WHERE email ='${dataBody.email}'`
    let result = await prisma.$queryRawUnsafe(sqlEmail)

    if (result.length === 0) {
        return false
    } else {

        let sqlCPF = `SELECT id FROM tbl_dado_pessoal_doador WHERE cpf ='${dataBody.cpf}' AND id_cadastro =${result[0].id}`
        let verifyAccount = await prisma.$queryRawUnsafe(sqlCPF)

        if (verifyAccount.length !== 0) {

            let newPassword = `UPDATE tbl_cadastro_doador  SET senha = '${dataBody.new_password}' where id =${result[0].id}`
            let statusPassword = await prisma.$executeRawUnsafe(newPassword)

            if (statusPassword) {
                return true
            } else {
                return false
            }
        }
    }
}

const getAllDataRegisterUser = async function (id) {

    let sql = `SELECT  id FROM tbl_cadastro_doador where id =${id}`
    let result = await prisma.$queryRawUnsafe(sql)
    if (result.length === 0) {
        return false
    } else {

        let data_personal = {}
        let sqlDataPersonal = `SELECT * FROM tbl_dado_pessoal_doador WHERE id_cadastro = ${id}`
        let resultDataUser = await prisma.$queryRawUnsafe(sqlDataPersonal)
        if (resultDataUser.length !== 0) {
            data_personal = {
                id: resultDataUser[0].id,
                nome: resultDataUser[0].nome,
                rg: resultDataUser[0].rg,
                cpf: resultDataUser[0].cpf
            }
        } else {
            data_personal = {
                nome: "",
                rg: "",
                cpf: ""
            }
        }

        if (resultDataUser.length !== 0) {
            let data_contacts = {}
            let sqlDateContacts = `SELECT ddd, numero_telefone FROM tbl_numero_telefone where id_dado_pessoal_doador = ${resultDataUser[0].id_cadastro}`
            let resultDataContacts = await prisma.$queryRawUnsafe(sqlDateContacts)
            if (resultDataContacts.length !== 0) {
                data_contacts = {
                    ddd: resultDataContacts[0].ddd,
                    numero_telefone: resultDataContacts[0].numero_telefone
                }
            } else {
                data_contacts = {
                    ddd: "",
                    numero_telefone: ""
                }
            }

            let data_payment = {}
            let sqlDataPaymentUser = `SELECT numero_cartao, nome, ano,mes, cvv FROM tbl_cartao where id_dado_pessoal_doador = ${resultDataUser[0].id_cadastro}`
            let resultDataPaymentUser = await prisma.$queryRawUnsafe(sqlDataPaymentUser)
            if (resultDataPaymentUser.length !== 0) {
                data_payment = {
                    numero_cartao: resultDataPaymentUser[0].numero_cartao,
                    nome: resultDataPaymentUser[0].nome,
                    ano: resultDataPaymentUser[0].ano,
                    mes: resultDataPaymentUser[0].mes,
                    cvv: resultDataPaymentUser[0].cvv
                }
            } else {
                data_payment = {
                    numero_cartao: "",
                    nome: "",
                    ano: "",
                    mes: "",
                    cvv: ""
                }
            }

            let dataJson = {
                data_personal,
                data_contacts,
                data_payment
            }

            console.log(dataJson)
            return dataJson
        }
    }
}

const insertDonationOfUser = async function (dataBody) {

    let checkIdExistsQuery = `SELECT * FROM tbl_cadastro_doador WHERE id =${dataBody.id_register_user}`;
    let idExistsResult = await prisma.$queryRawUnsafe(checkIdExistsQuery)
    if (idExistsResult.length === 0) {
        return false
    } else {
        let sql = `insert into tbl_registro_doacao(
            nome,
            email,
            valor,
            id_cadastro
        )values(
            '${dataBody.name}',
            '${dataBody.email}',
            ${dataBody.donation},
            ${dataBody.id_register_user}
        )`

        await prisma.$executeRawUnsafe(sql)
        
        return true
    }
}

const getAllDonation = async function () {

    let sql = 'SELECT nome, email, valor FROM tbl_registro_doacao'
    let result = await prisma.$queryRawUnsafe(sql)

    if(result.length === 0){
        return false
    }else{
        return result
    }
}

//Função para inserir o cadastro do funcionario no banco de dados
const insertEmployee = async function (dateEmployee) {

    //Verifica se o email ja foi cadastrado
    //A função COUNT(*) é usada para contar todas as linhas da tabela tbl_cadastro_doador que possuem o valor do campo email igual a 'email_usuario', se for 0 Ainda nao foi cadastrado o email
    let checkEmailExistsQuery = `SELECT COUNT(*) AS count FROM tbl_funcionario WHERE email ='${dateEmployee.email}'`;
    let emailExistsResult = await prisma.$queryRawUnsafe(checkEmailExistsQuery)

    if (emailExistsResult && emailExistsResult[0].count > 0) {
        return {
            error: true
        }

    } else {
        //Script SQL para cadastrar o usuario no banco
        let sql = `insert into tbl_funcionario(
        nome,
        email,
        senha,
        foto_url,
        id_administrador
    )values(
        '${dateEmployee.name}',
        '${dateEmployee.email}',
        '${dateEmployee.password}',
        '${dateEmployee.photo_url}',
        ${dateEmployee.id_administrator}
    )`

        // Insert, update ou delet se utiliza o $Execute se for esperar retorno de dados $Query
        //Excuta o script no banco de dados e retorna se deu certo ou nao o insert aluno

        let result = await prisma.$executeRawUnsafe(sql)
        if (result) {
            return true
        } else {
            return false
        }
    }

}

const verifyAccountEmployee = async function (dateEmployee) {

    let adm = `SELECT id FROM tbl_administrador WHERE email ='${dateEmployee.email}' AND senha ='${dateEmployee.password}'`
    let resultAdm = await prisma.$queryRawUnsafe(adm)

    console.log(resultAdm)
    if (resultAdm.length !== 0) {
        return true
    } else {
        let sql = `SELECT id,nome,foto_url FROM tbl_funcionario WHERE email ='${dateEmployee.email}' AND senha ='${dateEmployee.password}'`

        let result = await prisma.$queryRawUnsafe(sql)

        if (result.length === 0) {
            return false
        } else {
            return result
        }
    }
}

const deleteEmployee = async function (email) {
    let sql = `delete from tbl_funcionario where email='${email}'`

    let result = await prisma.$executeRawUnsafe(sql)

    if (result) {
        return true
    } else {
        return false
    }
}

module.exports = {
    insertUser,
    selectLastId,
    verifyAccountUser,
    insertDataPersonalUser,
    insertDataPersonalCard,
    updatePasswordUser,
    getAllDataRegisterUser,
    insertEmployee,
    verifyAccountEmployee,
    deleteEmployee,
    insertDonationOfUser,
    getAllDonation
}