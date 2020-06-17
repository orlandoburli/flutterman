const { osType } = require('../utils/so')
const fetch = require('node-fetch');

const FLUTTER_RELEASE_URL = `https://storage.googleapis.com/flutter_infra/releases`
const FLUTTER_WINDOWS = `${FLUTTER_RELEASE_URL}/releases_windows.json`
const FLUTTER_LINUX = `${FLUTTER_RELEASE_URL}/releases_linux.json`
const FLUTTER_MACOS = `${FLUTTER_RELEASE_URL}/releases_macos.json`

const URL_MAPPER = {
  'windows': FLUTTER_WINDOWS,
  'macos': FLUTTER_MACOS,
  'linux': FLUTTER_LINUX
}

const filterUnique = (value, index, self) => self.indexOf(value) === index

exports.getFlutterChannels = (versions) =>
  Promise.resolve(versions
    .releases
    .map(v => v.channel)
    .filter(filterUnique)
  )

exports.getFlutterVersions = () => new Promise((resolve, reject) => {
  fetch(URL_MAPPER[osType()])
    .then((response) => response.json())
    .then(resolve)
    .catch(reject)
})