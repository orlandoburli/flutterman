require('../utils/colors')
const fs = require('fs')
const ora = require('ora')
const AdmZip = require('adm-zip')

const extract = (zip, pathToUnzip) =>
  Promise.resolve(zip.extractAllToAsync(pathToUnzip, true))

exports.unzip = (fileName) => new Promise((resolve, reject) => {

  const spinner = ora('Extracting files, please wait...').start();

  const pathToUnzip = fileName.substring(0, fileName.length - 4)

  if (fs.existsSync(pathToUnzip)) fs.rmdirSync(pathToUnzip, { recursive: true })

  fs.mkdirSync(pathToUnzip, { recursive: true })

  const zip = new AdmZip(fileName)

  extract(zip, pathToUnzip)
    .then(() => {
      spinner.succeed('Files successfully extracted!')

      resolve({
        success: true,
        path: pathToUnzip
      })
    })
    .catch(reject)
})