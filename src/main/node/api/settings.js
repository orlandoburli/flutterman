const fs = require('fs')
const { flutterManHome } = require('../helpers/pathHelpers');

const settingsFileName = () => `${flutterManHome()}/settings.json`;

exports.getSettings = async () => {
  const file = settingsFileName()

  if (fs.existsSync(file)) {
    const raw = fs.readFileSync(file)
    let data = JSON.parse(raw)
    data.versions = data.versions || []
    return data
  } else {
    return {
      versions: []
    }
  }
}

exports.addVersion = async (version) => {
  const settings = await this.getSettings()
  if (!settings.versions.find(v => v.version == version.version && v.channel == version.channel)) {
    settings.versions.push(version)
  }

  await this.saveSettings(settings)
}

exports.setCurrentVersion = async (version) => {
  const settings = await this.getSettings()

  settings.currentVersion = version

  await this.saveSettings(settings)
}

exports.versionsExistsLocally = async (version) => {
  const settings = await this.getSettings()

  return this.versionsExistsInSettings(version, settings)
}

exports.versionsExistsInSettings = (version, settings) => {
  return settings.versions.find(v => v.hash == version.hash)
}

exports.saveSettings = async (settings) => {
  const file = settingsFileName()

  fs.writeFileSync(file, JSON.stringify(settings, null, 4))
}
