// modulos externos
import inquirer from 'inquirer'
import ansi from 'ansi-colors'

// modulos internos
import fs from 'fs'

operation()

function operation(){

    inquirer.prompt([
        {
        type: 'list',
        name: 'action',
        message: 'O que você deseja? ',
        choices: ['Criar Conta','Consultar Saldo','Depositar','Sacar', 'Sair'],
        },
    ]).then((answer) => {
        const action = answer['action']

        if(action === 'Criar Conta'){
            createAccount()
        } else if(action === 'Depositar') {
            deposit()
        } else if(action === 'Consultar Saldo') {
            getAccountBalance()
        } else if(action === 'Sacar') {

        } else if(action === 'Sair') {
            console.log(ansi.bgBlue.black('Obrigado por usar nosso banco!'))
            process.exit()
        }
    }).catch(err => console.log(err))
}

// creat an account
function createAccount() {
    console.log(ansi.bgGreen.black('Parabéns por escolher o nosso banco!'))
    console.log(ansi.green('Defina as opções para sua conta a seguir'))

    buildAccount()
}

function buildAccount() {

    inquirer.prompt([
        {
            name: 'accountName',
            message: 'Digite um nome para sua conta:'
        },
    ])
    .then((answer) => {
        const accountName = answer['accountName']

        console.info(accountName)

        if(!fs.existsSync('accounts')) {
            fs.mkdirSync('accounts')
            }

        if(fs.existsSync(`accounts/${accountName}.json`)) {
            console.log(ansi.bgRed.black('Esta conta ja existe, escolha outro nome:'),
           )
           buildAccount()
           return
        }

        fs.writeFileSync(`accounts/${accountName}.json`, '{"balance": 0}', 
            function (err) { 
                console.log(err)
            }, 
        )

        console.log(ansi.green('Parabéns, a sua conta foi criada com sucesso!'))

        operation()
    })
    .catch(err => console.log(err))
}

// add an amount to user account
function deposit() {

    inquirer.prompt([
        {
            name: 'accountName',
            message: 'Qual o nome da sua conta?'
        }
    ])
    .then((answer) => {
        const accountName = answer['accountName']

        // Verify if accounts exists      
        if(!checkAccount(accountName)) {
            return deposit()
        }

        inquirer.prompt([
            {
                name: 'amount',
                message: 'Quanto você deseja depositar?',
            },
        ])
        .then((answer) => {
            const amount = answer['amount']

            //add an amount
            addAmount(accountName, amount)
            operation()

        })
        .catch((err) => console.log(err))
    })
    .catch(err => console.log(err))
}

function checkAccount(accountName) {

    if(!fs.existsSync(`accounts/${accountName}.json`)){
        console.log(ansi.bgRed.black('Está conta não existe, verifique se o nome está correto.'))
        return false
    }

    return true
}

function addAmount(accountName, amount) {
    const accountData = getAccount(accountName)

    if(!amount) {
        console.log(ansi.bgRed.black('Ocorreu um erro, tente novamente mais tarde.'),)
        return deposit()
    }

    accountData.balance = parseFloat(amount) + parseFloat(accountData.balance)

    fs.writeFileSync(
        `accounts/${accountName}.json`,
        JSON.stringify(accountData),
        function (err) {
            console.log(err)
        },
    )
    console.log(ansi.green(`Foi depositado o valor de R$${amount} na sua conta!`))
}

function getAccount(accountName) {
    const accountJSON = fs.readFileSync(`accounts/${accountName}.json`, {
        encoding: 'utf-8',
        flag: 'r'
    })
    return JSON.parse(accountJSON)
}

// show account balance
function getAccountBalance() {
    inquirer.prompt([
        {
            name: 'accountName',
            message: 'Qual o nome da sua conta?'
        }
    ])
    .then((answer) => {
        const accountName = answer['accountName']

        // verify if account exists
        if (!checkAccount(accountName)) {
            return getAccountBalance()
        }

        const accountData = getAccount(accountName)

        console.log(ansi.bgBlue.black(`Olá, o saldo de sua conta é de ${accountData.balance}`), )
        operation()
    })
    .catch(err => console.log(err))
}