require('../utils/colors')
const fs = require('fs')
const ora = require('ora')
const DecompressZip = require('decompress-zip');

const ZIP_EXTENSION = '.zip';

exports.pathFromZip = (fileName) => fileName.substring(0, fileName.length - ZIP_EXTENSION.length)

exports.unpackZipFile = (fileName) => new Promise((resolve, reject) => {

  const spinner = ora('Extracting files, please wait...').start();

  const pathToUnzip = this.pathFromZip(fileName)

  if (fs.existsSync(pathToUnzip)) fs.rmdirSync(pathToUnzip, { recursive: true })

  fs.mkdirSync(pathToUnzip, { recursive: true })

  const unzipper = new DecompressZip(fileName)

  unzipper.on('error', function (err) {
    console.error(err)
    spinner.fail('Error when extract files!')
    reject({ success: false, message: err })
  });

  unzipper.on('extract', function (log) {
    spinner.succeed('Files successfully extracted!')
    resolve({
      success: true,
      path: pathToUnzip
    })
  });

  unzipper.on('progress', function (fileIndex, fileCount) {
    spinner.text = `Extracting files, please wait... (${fileIndex} of ${fileCount})`
  });

  unzipper.extract({ path: pathToUnzip });
})