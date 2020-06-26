const { flutterManHome } = require("../helpers/pathHelpers")

const fs = require('fs')
const { isWindows, isLinux, isOSX } = require("current-os")

const ZIP_EXTENSION = '.zip';
const TAR_XZ_EXTENSION = '.tar.xz';
const TAR_GZ_EXTENSION = '.tar.gz';

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
    fs.chmodSync(`${sdkCurrentPath}/flutter/bin/cache/dart-sdk/bin/pub`, 0o777)
    fs.chmodSync(`${sdkCurrentPath}/flutter/bin/cache/artifacts/ios-deploy/ios-deploy`, 0o777)
  }
}

exports.versionPath = (version) => {
  let fileName = version.archive

  if (fileName.endsWith(ZIP_EXTENSION)) {
    fileName = fileName.substring(0, fileName.length - ZIP_EXTENSION.length)
  } else if (fileName.endsWith(TAR_XZ_EXTENSION)) {
    fileName = fileName.substring(0, fileName.length - TAR_XZ_EXTENSION.length)
  } else if (fileName.endsWith(TAR_GZ_EXTENSION)) {
    fileName = fileName.substring(0, fileName.length - TAR_GZ_EXTENSION.length)
  }

  return `${flutterManHome()}/sdk/versions/${fileName}`
}
