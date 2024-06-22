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

        } else if(action === 'Consultar Saldo') {

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
    console.log(ansi.green('Defina as condições de sua conta a seguir'))

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