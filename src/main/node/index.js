const { printBrand, printVersionInstaled } = require('./helpers/printHelpers')
const { getFlutterVersions, getFlutterChannels } = require("./api/flutterVersions");
const { selectFlutterVersion, selectFlutterChannel, confirmCurrentVersion } = require('./input/inputController');
const { downloadFlutterVersion } = require('./api/downloadHelper');
const { unzip } = require('./api/unpackHelper');
const { addVersion, versionsExistsLocally, setCurrentVersion } = require('./api/settings');
const { changeShellFlutterVersion } = require('./api/shell');

exports.main = async (args) => {
  printBrand()

  const versions = await getFlutterVersions()
  const channels = await getFlutterChannels(versions)
  const channel = await selectFlutterChannel(channels)
  const version = await selectFlutterVersion(versions, channel)
  const localVersion = await versionsExistsLocally(version)
  const changeCurrentVersion = await confirmCurrentVersion(version)

  if (!localVersion) {
    const downloadedFile = await downloadFlutterVersion(versions.base_url, version)
    await unzip(downloadedFile.fileName)
  } else {
    await addVersion(version)
  }

  await addVersion(version)

  if (changeCurrentVersion) {
    await setCurrentVersion(version)
    await changeShellFlutterVersion(version)

    printVersionInstaled(version)
  }
}