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

        console.log(action)
    }).catch(err => console.log(err))
}