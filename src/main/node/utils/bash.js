const currentOS = require('current-os');
const os = require('os');
const fs = require('fs');
const chalk = require('chalk');

const flutterRc = `

# This is a flutterman setup. Do not modify.
FLUTTER_HOME=$HOME/.flutter/sdk/current/flutter
export PATH=$FLUTTER_HOME/bin:$PATH
`

exports.configBash = async () => {
  if (!currentOS.isWindows) {
    const home = os.homedir()
    let rcFile = ''
    if (fs.existsSync(`${home}/.zshrc`)) {
      rcFile = `${home}/.zshrc`
    } else if (fs.existsSync(`${home}/.bashrc`)) {
      rcFile = `${home}/.zshrc`
    } else if (fs.existsSync(`${home}/.bash_profile`)) {
      rcFile = `${home}/.bash_profile`
    }

    if (rcFile) {
      const data = fs.readFileSync(rcFile, 'utf-8')

      if (data.indexOf(flutterRc) < 0) {
        fs.appendFileSync(rcFile, flutterRc);

        console.log(`We have modified your bash file. Please run ${chalk.bold(`source ${rcFile}`)} or open a new console.`)
      }
    } else {
      console.warn('Sorry, i can\'t find you bash file!')
      console.warn('Please, add the folowing lines in your initializer script:')
      console.warn(flutterRc)
    }
  } else {
    console.warn('Sorry, windows is not supported yet!')
  }
}