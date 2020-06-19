const chalk = require("chalk")
const logSymbols = require('log-symbols');

exports.printBrand = () => {
  console.log(chalk.bold('**********************************************'))
  console.log(chalk.bold('*   Flutterman - A sdk manager for flutter   *'))
  console.log(chalk.bold('* https://github.com/orlandoburli/flutterman *'))
  console.log(chalk.bold('**********************************************'))
}

exports.printInstructions = () => {

}

exports.printVersionInstaled = (version) => {
  console.log(`${logSymbols.success} Version ${chalk.bold(version.version)} successfuly configured!`)
}