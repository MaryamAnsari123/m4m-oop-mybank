#! /usr/bin/env node

import inquirer from "inquirer"
import chalk from "chalk"

// Bank Account interface

interface BankAccount {
    accNum : number;
    bal : number;
    withDraw(amount: number): void;
    Deposite(amount: number): void;
    checkBal(): void;
}

// Bank Account class
class myBankAcc implements BankAccount {
    accNum: number;
    bal: number;
    constructor(AccNo: number , balance : number){
        this.accNum = AccNo
        this.bal = balance
    }

    // Debit Money
    withDraw(amount: number): void {
        if(this.bal >= amount){
            this.bal -= amount;
            console.log(chalk.greenBright.bold(` \n withdrawal of $${chalk.yellowBright.bold.italic((amount))} successfully. Your remaining balance is $${chalk.yellowBright.italic.bold(this.bal)} \n`));
        }
        else {
            console.log(chalk.redBright.bold(" \n insufficent balance! :( \n "));
        }
    }
    // Credit Money
    Deposite(amount: number): void {
        if(amount > 100){
            amount -= 1        // 1 doller fee charged if more than $100 is dedposited
        }
        this.bal += amount;
        console.log(chalk.greenBright.bold(` \n Deposit of $${chalk.yellowBright.bold(amount)} successfully. your remaining balance is $${chalk.yellowBright.bold(this.bal)} \n`));
    }

    // check Balance

checkBal(): void {
    console.log(chalk.magentaBright.bold(` \n your current Balance is $${chalk.greenBright.bold(this.bal)} \n`));
}
}

// Customer Class

class Customer {
    firstName : string;
    lastName : string;
    Gender : string;
    Age : number;
    mobileNum : number;
    Account : myBankAcc

    constructor(fName: string , lName: string , gen: string , age: number, mobNum: number, Acc: myBankAcc){
        this.firstName = fName
        this.lastName = lName
        this.Gender = gen
        this.Age = age
        this.mobileNum = mobNum
        this.Account = Acc
    }
}

// Create Bank Account

const accounts: myBankAcc[] = [
    new myBankAcc (1001 , 500),
    new myBankAcc (1002 , 1000),
    new myBankAcc (1003 , 1500),
]

//create Customers

const customers : Customer[] = [
    new Customer ("Maryam" , "Ansari" , "Female" , 22 , 7574776366 , accounts[0]),
    new Customer ("Saad" , "khan" , "Male" , 32 , 7464664737 , accounts[1]),
    new Customer ("Sana" , "Qureshi" , "Female" , 25 , 7466366388 , accounts[2]),
]

// function to intract with bank Account
console.log(chalk.bgCyanBright.bold.italic("\n ***** WELCOME OUR BANK SERVICE ***** \n"));

async function BankService() {
    do{
        const AccountNumber = await inquirer.prompt(
            {
            name : "accountnum",
            type: "number",
            message: chalk.bgBlueBright.bold("Enter your Account Number:")
        }
    )
    const customer = customers.find(customer => customer.Account.accNum === AccountNumber.accountnum)

    if(customer){
        console.log(chalk.yellowBright.bold(`Welcome, ${customer.firstName} ${customer.lastName}! \n`));
        const Ans = await inquirer.prompt(
            [
                {
                name : "select",
                type : "list",
                message: chalk.bgBlueBright.bold("Select an Operation:"),
                choices: ["Deposite" , "WithDraw" , "CheckBalance" , "Exit"]
                }
            ]
        );
        
        switch(Ans.select) {
            case "Deposite":
                const depositeAmount = await inquirer.prompt(
                    [
                        {
                            name : "amount",
                            type: "number",
                            message : chalk.bgBlueBright.bold("Enter the amount to Deposite:")
                        }
                    ]
                )
                customer.Account.Deposite(depositeAmount.amount)
        
        break;
            case "WithDraw":
                const withDrawAmount = await inquirer.prompt(
                    [
                        {
                            name : "amount",
                            type: "number",
                            message : chalk.bgBlueBright.bold("Enter the amount to Deposite:")
                        }
                    ]
                )
                customer.Account.withDraw(withDrawAmount.amount)
                break;
                    case "CheckBalance":
                        customer.Account.checkBal();
                break;
                case "Exit":
                    console.log(chalk.greenBright.bold(" \t Exiting Bank Program...."));
                    console.log(chalk.magentaBright.bold("\n Thank you! for Using our Bank Service. Have a great Day! \n"));
                    return;
        }
    }
    else {
        console.log(chalk.redBright.bold(" \n Invalid Account number, Please try Again! \n"));
    }
    }
    while(true)
}

BankService()