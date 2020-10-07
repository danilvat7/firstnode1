var azure = require('azure-storage');
const { v4: uuidv4 } = require('uuid');
var connection =
  'DefaultEndpointsProtocol=https;AccountName=firstnode1;AccountKey=Fqv6ie5W9SLJvhQd5LdWSq8hIK7fhtmkE78QfwY6VESDKhBtc+JVR/YB/CD0AGgLpAmJ6aL4FRJEmw5Jz7I3Qw==;EndpointSuffix=core.windows.net';
var blobService = azure.createBlobService(connection);

var saveImage = function (stream, size, callback) {
  var id = uuidv4();

  blobService.createBlockBlobFromStream('images', id, stream, size, (err) => {
    callback(err, id);
  });
};

var getImageUri = function (imageId) {
  var url = blobService.getUrl('images', imageId);
  var sas = blobService.generateSharedAccessSignature('images', imageId, {
    AccessPolicy: {
      Permissions: azure.BlobUtilities.SharedAccessPermissions.READ,
      Start: azure.date.minutesFromNow(-15),
      Expiry: azure.date.minutesFromNow(30),
    },
  });
  return `${url}?${sas}`;
};

module.exports = {
  saveImage: saveImage,
  getImageUri: getImageUri,
};
