const chalk = require("chalk")

exports.printBrand = () => {
  console.log(chalk.bold('**********************************************'))
  console.log(chalk.bold('*   Flutterman - A sdk manager for flutter   *'))
  console.log(chalk.bold('* https://github.com/orlandoburli/flutterman *'))
  console.log(chalk.bold('**********************************************'))
}

exports.printInstructions = () => {

}

exports.printVersionInstaled = (version) => {
  console.log(`Version ${chalk.bold(version.version)} already installed`)
}