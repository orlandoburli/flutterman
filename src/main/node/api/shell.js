const { flutterManHome } = require("../helpers/pathHelpers")

const fs = require('fs')
const { isWindows } = require("current-os")

exports.prepareFlutterSdkHome = async () => {
  const home = `${flutterManHome()}/sdk`

  if (!fs.existsSync(home)) {
    fs.mkdirSync(home, { recursive: true })
  }
}

exports.changeShellFlutterVersion = async (version) => {

  await this.prepareFlutterSdkHome()

  const home = flutterManHome()

  const sdkCurrentPath = `${home}/sdk/current`

  if (fs.existsSync(sdkCurrentPath)) {
    fs.unlinkSync(sdkCurrentPath)
  }

  fs.symlinkSync(this.versionPath(version), sdkCurrentPath)

  this.checkExecutables()
}

exports.checkExecutables = async () => {
  await this.prepareFlutterSdkHome()

  const home = flutterManHome()

  const sdkCurrentPath = `${home}/sdk/current`

  if (isWindows) {
    fs.chmodSync(`${sdkCurrentPath}/flutter/bin/flutter.bat`, 0755)
  } else {
    fs.chmodSync(`${sdkCurrentPath}/flutter/bin/flutter`, 0o777)
    fs.chmodSync(`${sdkCurrentPath}/flutter/bin/cache/dart-sdk/bin/dart`, 0o777)
  }
}

exports.versionPath = (version) => `${flutterManHome()}/sdk/versions/${version.archive.substring(0, version.archive.length - 4)}`
