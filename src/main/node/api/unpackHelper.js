const { unpackZipFile } = require('./zipUnpacker');
const { unpackTarXzFile } = require('./tarXzUnpacker');

const ZIP_EXTENSION = '.zip';
const TAR_XZ_EXTENSION = '.tar.xz';
const TAR_GZ_EXTENSION = '.tar.gz';

exports.pathFromZip = (fileName) => {
  if (fileName.endsWith(ZIP_EXTENSION)) {
    return fileName.substring(0, fileName.length - ZIP_EXTENSION.length)
  } else if (fileName.endsWith(TAR_XZ_EXTENSION)) {
    return fileName.substring(0, fileName.length - TAR_XZ_EXTENSION.length)
  } else if (fileName.endsWith(TAR_GZ_EXTENSION)) {
    return fileName.substring(0, fileName.length - TAR_GZ_EXTENSION.length)
  }
}

exports.unpack = (fileName) => {
  let zipMethod = undefined

  if (fileName.endsWith(ZIP_EXTENSION)) {
    zipMethod = unpackZipFile
  } else if (fileName.endsWith(TAR_XZ_EXTENSION)) {
    zipMethod = unpackTarXzFile
  } else if (fileName.endsWith(TAR_GZ_EXTENSION)) {
    // TODO
  }

  return zipMethod ? zipMethod(fileName) : Promise.reject({ success: false, message: `Extension not implemented ${fileName}` })
}