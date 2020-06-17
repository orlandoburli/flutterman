const prompts = require('prompts');
const { getSettings, versionsExistsInSettings } = require('../api/settings');

exports.selectFlutterChannel = async (channels) => {

  const stableIndex = channels.indexOf('stable')

  const response = await prompts({
    type: 'select',
    name: 'value',
    message: 'Select flutter channel',
    choices: channels.map(c => { return { title: c, value: c } }),
    initial: stableIndex
  })

  return response.value
}

exports.selectFlutterVersion = async (versions, channel) => {
  const filteredVersions = versions
    .releases
    .sort((a, b) => a.release_date - b.release_date)
    .filter(v => v.channel == channel)

  const settings = await getSettings()

  const versionExistsLocal = (version) => versionsExistsInSettings(version, settings)

  const response = await prompts({
    type: 'select',
    name: 'value',
    message: `Select flutter version from channel "${channel}"`,
    choices: filteredVersions.map(v => { return { title: `${v.version}${versionExistsLocal(v) ? ' *' : ''}`, value: v } }),
    initial: 0
  })

  return response.value
}

exports.confirmCurrentVersion = async (version) => {
  const response = await prompts({
    type: 'toggle',
    name: 'value',
    message: `Do you want to make ${version.version} (${version.channel}) the current version?`,
    initial: (version.channel == 'stable'),
    active: 'Yes',
    inactive: 'No'
  })

  return response.value
}