require('../utils/colors')
const fs = require('fs')
const path = require('path')
const request = require('request')
const progress = require('request-progress')
const _cliProgress = require('cli-progress')
const chalk = require('chalk')
const { flutterManHome } = require('../helpers/pathHelpers')
const { prepareFlutterSdkHome } = require('./shell')

exports.downloadFlutterVersion = (base_url, version) => new Promise((resolve, reject) => {

  prepareFlutterSdkHome()

  const fileName = `${flutterManHome()}/sdk/versions/${version.archive}`
  const pathName = path.dirname(fileName)
  const url = `${base_url}/${version.archive}`

  if (!fs.existsSync(pathName)) fs.mkdirSync(pathName, { recursive: true })

  if (fs.existsSync(fileName)) {
    fs.unlinkSync(fileName)
  }

  console.log('')
  console.log(chalk.magenta(`Preparing to download ${version.archive} file...`))

  console.log(chalk.green())

  const file = fs.createWriteStream(fileName);
  let receivedBytes = 0

  const progressBar = new _cliProgress.SingleBar({
    format: '{bar} {percentage}% | ETA: {eta}s'
  }, _cliProgress.Presets.shades_classic);

  progress(request(url), {})
    .on('response', (response) => {
      const totalBytes = response.headers['content-length'];
      progressBar.start(totalBytes, 0);
    })
    .on('data', (chunk) => {
      receivedBytes += chunk.length;
      progressBar.update(receivedBytes);
    })
    .pipe(file)
    .on('error', function (err) {
      resetColor()
      reject({
        success: false,
        message: `Error downloading file ${url}: ${err.message}`
      });
    })

  file.on('finish', () => {
    progressBar.stop()
    file.close()

    console.log(chalk.blue('Download finished!'))

    resolve({
      success: true,
      previousExists: false,
      message: `File ${fileName} is successfuly downloaded.`,
      fileName
    })
  })

  file.on('error', (err) => {
    // resetColor()
    fs.unlink(filename);
    progressBar.stop();
    reject({
      success: false,
      message: `Error writing local file ${fileName}: ${err.message}`
    });
  })

})
