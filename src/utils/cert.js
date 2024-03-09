const API_KEYS = [
  'localhost', '96D0C1491615C82B9A54D9989779DF825B690748224C2B04F500F370D51827CE2644D8D4A82C18184D73AB8530BB8ED537269603F61DB0D03D2104ABF789970B',
  '127.0.0.1', 'A7BCFA5D490B351BE0754130DF03A068F855DB4333D43921125B9CF2670EF6A40370C646B90401955E1F7BC9CDBF59CE0B2C5467D820BE189C845D0B79CFC96F',
  'fund.uznature.uz', '3F1B900422D934894330845F3653779A96C329C60DBFEE847008E9FD49165721E379BB4BDEA5C859F3303596AE9F178FCB3901E6AD6EBA70FF02BF0194132AB1',
];
var NEW_API = false;

const cert = {

  checkVersion: function(success, fail){
    CAPIWS.version(function (event, data) {
      if(data.success === true){
        if(data.major && data.minor){
          var installedVersion = parseInt(data.major) * 100 + parseInt(data.minor);
          NEW_API = installedVersion >= 336;
          success(data.major, data.minor);
        } else {
          fail(null, 'E-IMZO Version is undefined');
        }
      } else {
        fail(null, data.reason);
      }
    }, function (e) {
      fail(e, null);
    });
  },

  installApiKeys: function(success, fail){
    CAPIWS.apikey(API_KEYS, function (event, data) {
      if (data.success) {
        success();
      } else {
        fail(null,data.reason);
      }
    }, function (e) {
      fail(e, null);
    });
  },
  getCerts(callback, error) {
    CAPIWS.callFunction({
        plugin: "pfx",
        name: "list_all_certificates"
      },
      function (event, data) {
        callback(event, data);
      },
      function (msg) {
        error(msg);
      }
    );
  },

  /**
   * requestArr :[
   *     //Данные в кодировке BASE64 (будут предваритьльно декодированы, подписаны и вложены в документ)
   *     data_64,
   *     //Идентификатор ключа подписывающего лица (полученный из фукнции других плагинов)
   *     id,
   *     //Возможные значения: 'yes' - будет создан PKCS#7/CMS документ без вложения исходных данных, 'no' или '' - будет создан PKCS#7/CMS документ с вложением исходных данных
   *     detached
   * ]
   *
   * Example:
   * request_data: {"plugin":"pkcs7","name":"create_pkcs7","arguments":["bm90X3NpZ25lZF9kYXRhPSZzaWduZWRfZGF0YT0mZWRjX3ZhbHVlPTc3N0EyQTJCJkVkY0xvZ2luW3VzZXJdPSZfY3NyZi1mcm9udGVuZD0wRGhzNm1QUE1mSVdTa3gxSDVaNC00UGFYbk9HOWFHMHczUk5zSW40TzVfbkNoNmFFWUpsbTFVdUpFVXAyUi1MdHBZd0d2eUEyLXVDQVhYQ3g2cEwxQSUzRCUzRA==","e8d6197fd94176fd294379543ad3edb7","no"]}
   * response_data: {"pkcs7_64":"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","signer_serial_number":"777a2a2b","signature_hex":"efc303f9188863dd0a185741a9cb53fa16aff5d9a6bb2f59d6465f1649e119d63fc343614867cbcbda50aa9587e7d8b3187496ed9ee6d466321171d9d54cfc1c","success":true}
   *
   */
  createPkcs7(callback, error, requestArr) {
    CAPIWS.callFunction({
        plugin: "pkcs7",
        name: "create_pkcs7",
        arguments: requestArr
      },
      function (event, data) {
        if (data.success) {
          callback(event, data)
        } else {
          if (data.className) {
            error('Failed to connect to E-Imzo')
          } else {
            error(data.reason)
          }
        }
      },
      function (msg) {
        error(msg)
      }
    )
  },

  verifyPassword(callback, error, pfxId){
    CAPIWS.callFunction({
        plugin: "pfx",
        name: "verify_password",
        arguments: [pfxId]
      },
      function (event, data) {
        if (data.success) {
          console.log('verifyPassword.callback.success', data);
          callback(event, data)
        } else {
          console.log('verifyPassword.callback.error', data);
          if (data.className) {
            error('Failed to connect to E-Imzo')
          } else {
            error(data.reason)
          }
        }
      },
      function (msg) {
        console.log('verifyPassword.error', msg);
        error(msg)
      }
    )
  },

  /**
   * sData: biror bir lyuboy data
   */
  loadPKey(callback, error, certificate) {
    CAPIWS.callFunction({
        plugin: "pfx",
        name: "load_key",
        arguments: [
          certificate.disk,
          certificate.path,
          certificate.name,
          certificate.alias,
        ]
      },
      function (event, data) {
        if (data.success) {
          console.log('loadPKey.callback.success', data);
          certificate.keys = {
            keyId: data.keyId,
            type: data.type
          }
          cert.verifyPassword(callback, error, data.keyId);
        } else {
          console.log('loadPKey.callback.error', data);
          if (data.className) {
            error('Failed to connect to E-Imzo')
          } else {
            error(data.reason)
          }
        }
      },
      function (msg) {
        console.log('loadPKey.error', msg);
        error(msg)
      })
  },

};


export default cert;
