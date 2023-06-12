/********************************************************************************
 * Objetivo: Arquivo responsavel pelas variaveis , constantes e funçõs globais
 * do projeto Banco.
 * Data: 22/05/2023
 * Versão: 1.0
 **********************************************************************************/

/***************************** Constante de ERROS *********************************/
const ERRO_REQUIRED_DATA = {status: 400, message: 'Preencha todos os campos! ', observation: 'A senha deve ter mais de 3 caracteres, e o nome de usuario deve ter mais de 2 caracteres.'}
const ERRO_DELETE_EMPLOYEE = {status: 400, message: 'O email do funcionario é obrigatório'}
const ERRO_REQUIRED_DATA_EMPLOYEE = {status: 400, message: 'Preencha todos os campos! ', observation: 'A senha deve ter mais de 3 caracteres, e o nome de usuario deve ter mais de 2 caracteres.'}  
const ERRO_UPDATE_INCORRECTS_USER = {status: 400, message: 'CPF ou Email incorretos.'}  
const ERRO_REQUIRED_DATA_DONATION = {status: 400, message: 'Preencha todos os campos! ', observation: 'O email, nome do usuario e o valor são obrigatórios.'}  
const ERRO_REQUIRED_DATA_PERSONAL = {status: 400, message: 'Preencha todos os campos! ', observation: 'O nome , rg, cpf, e id do usuario são obrigatórios'}  
const ERRO_REQUIRED_DATA_CONTACTS = {status: 400, message: 'Preencha todos os campos! ', observation: 'O ddd , numero de telefone e o id dos dados pessoais sao obrigatórios '} 
const ERRO_REQUIRED_UPDATE_PASSWORD = {status: 400, message: 'Preencha todos os campos! ', observation: 'O CPF, EMAIL e a nova senha são obrigatórios'} 
const ERRO_DATA_CARD = {status: 400, message: 'Preencha todos os campos! ', observation: 'O número do cartão , nome do usuario, mês , ano e o cvv são campos obrigatórios. O id da ligação tambem deve ser informado. '}  
const ERRO_REGISTER_DATA_CARD = {status: 400, message: 'Os dados do cartão já se encontram cadastrados na nossa base de dados'}  
const ERRO_REGISTER_DATA_CARD_BY_ID = {status: 400, message: 'O id informato como FK é inválido'}  
const ERRO_INTERNAL_SERVER= {status: 500, message: 'ERRO Inerno no servidor banco de dados'}  
const ERRO_REQUIRED_ID = {status: 400, message: 'O atributo id é obrigatorio na requisição', obs: 'Se o atributo id for uma FK verifique se ele existe.'}  
const ERROR_INVALID_CONTENT_TYPE = {status: 415, message: 'O tipo de midia content type da solicitação não é compativo com o servidor, [application/json]'}
const ERROR_NOT_FOUND= {status: 404, message: 'Nenhum registro encontrado na requisição.'}
const ERROR_INVALID_NAME= {status: 400, message: 'O atributo nome se encontra vazio ou foi informado de forma incorreta.'}
const ERROR_INVALID_EMAIL= {status: 400, message: 'Esse email já se enconta cadastrado em nossa base de dados.'}
const ERROR_INVALID_REGISTER = {status: 400, message: 'Dados de usuario como cpf, ddd e numero de telefone já se encontram cadastrados em nossa base de dados.'}
const ERROR_REQUIRE_EMAIL_PASSWORD = {status: 400, message: 'Email ou senha esta em um formato invalido'}
const ERROR_REQUIRE_VERITY_EMAIL_PASSWORD = {status: 400, message: 'Email ou senha incorretos'}
const ERROR_NOTFOUND_DONATION = {status: 400, message: 'Nenhum registro encontrado'}



/***************************** Constante de SUCESSOS ******************************/
const CREATED_ITEM = {status: 201, message: 'Registro criado com sucesso'}
const ALL_DONATION = {status: 201, message: 'Registro verificado com sucesso.'}
const UPDATED_ITEM = {status: 201, message: 'Registro atualiazado com sucesso'}
const VERIFITY_USER = {status: 201, message: 'Registro verificado com sucesso'}
const SAVE_DATA_USER = {status: 201, message: 'Registro salvo com sucesso'}
const SAVE_DATA_USER_CARD = {status: 201, message: 'Registro do cartão salvo com sucesso'}
const DELETE_EMPLOYEE = {status: 201, message: 'Registro do funcionario deletado com sucesso'}



module.exports = {
    ERRO_REQUIRED_DATA,
    ERRO_INTERNAL_SERVER,
    CREATED_ITEM,
    ERRO_REQUIRED_ID,
    UPDATED_ITEM,
    ERROR_INVALID_CONTENT_TYPE,
    ERROR_NOT_FOUND,
    ERROR_INVALID_NAME,
    ERROR_INVALID_EMAIL,
    ERROR_REQUIRE_EMAIL_PASSWORD,
    VERIFITY_USER,
    ERROR_REQUIRE_VERITY_EMAIL_PASSWORD,
    ERRO_REQUIRED_DATA_PERSONAL,
    ERRO_REQUIRED_DATA_CONTACTS,
    ERROR_INVALID_REGISTER,
    SAVE_DATA_USER,
    ERRO_DATA_CARD,
    SAVE_DATA_USER_CARD,
    ERRO_REGISTER_DATA_CARD,
    ERRO_REGISTER_DATA_CARD_BY_ID,
    ERRO_REQUIRED_UPDATE_PASSWORD,
    ERRO_UPDATE_INCORRECTS_USER,
    ERRO_REQUIRED_DATA_EMPLOYEE,
    ERRO_DELETE_EMPLOYEE,
    DELETE_EMPLOYEE,
    ERRO_REQUIRED_DATA_DONATION,
    ALL_DONATION,
    ERROR_NOTFOUND_DONATION
}