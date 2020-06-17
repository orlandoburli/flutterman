const currentOS = require('current-os');

exports.osType = () => {
  if (currentOS.isWindows) {
    return 'windows'
  } else if (currentOS.isOSX) {
    return 'macos'
  } else if (currentOS.isLinux) {
    return 'linux'
  } else {
    return 'undefined'
  }
}