const { printBrand, printVersionInstaled } = require('./helpers/printHelpers')
const { getFlutterVersions, getFlutterChannels } = require("./api/flutterVersions");
const { selectFlutterVersion, selectFlutterChannel, confirmCurrentVersion } = require('./input/inputController');
const { downloadFlutterVersion } = require('./api/downloadHelper');
const { unpack } = require('./api/unpackHelper');
const { addVersion, versionsExistsLocally, setCurrentVersion } = require('./api/settings');
const { changeShellFlutterVersion } = require('./api/shell');
const { configBash } = require('./utils/bash');

exports.main = async (args) => {
  printBrand()

  try {
    await configBash()
    const versions = await getFlutterVersions()
    const channels = await getFlutterChannels(versions)
    const channel = await selectFlutterChannel(channels)
    const version = await selectFlutterVersion(versions, channel)
    const localVersion = await versionsExistsLocally(version)
    const changeCurrentVersion = await confirmCurrentVersion(version)

    if (!localVersion) {
      const downloadedFile = await downloadFlutterVersion(versions.base_url, version)
      await unpack(downloadedFile.fileName)
      await addVersion(version)
    }

    if (changeCurrentVersion) {
      await setCurrentVersion(version)
      await changeShellFlutterVersion(version)

      printVersionInstaled(version)
    }
  } catch (err) {
    console.error(err)
  }
}