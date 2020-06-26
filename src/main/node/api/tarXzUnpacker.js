require('../utils/colors')
const fs = require('fs')
const ora = require('ora')
const ua = require('all-unpacker');

const TAR_XZ_EXTENSION = '.tar.xz';

exports.pathFromTar = (fileName) => fileName.substring(0, fileName.length - TAR_XZ_EXTENSION.length)

exports.unpackTarXzFile = (fileName) => new Promise((resolve, reject) => {

  const spinner = ora('Extracting files, please wait...').start();

  const pathToUnTar = this.pathFromTar(fileName)
  
  if (fs.existsSync(pathToUnTar)) fs.rmdirSync(pathToUnTar, { recursive: true })

  fs.mkdirSync(pathToUnTar, { recursive: true })

  ua.unpack(fileName, {
    quiet: true,
    targetDir: pathToUnTar,
    forceOverwrite: false,
    forceDirectory: false
  }, (err, _, text) => {
    if (err) {
      spinner.fail('Error when extract files!')
      reject({
        success: false,
        error: err
      })
    }
    if (text) {
      spinner.succeed('Files successfully extracted!')

      resolve({
        success: true,
        path: pathToUnTar
      })
    }
  })
})