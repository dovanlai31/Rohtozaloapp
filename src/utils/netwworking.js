

import { StatusBar, Platform, } from 'react-native';
import AppValue from '../values/AppValue';
let url =  AppValue.API_URL;
const secrect = 'max@@view@@01235';
export function get(api, headers) {
  return fetch(api, {
    method: 'get',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      ...headers,
    },
  })
    .then((response) => response.json().then((data) => data))
    .catch((err) => {
      // console.log('There is an error occurred while requesting api', err, api)
    });
}

export function post(api, params) {
	
  //let  xxxPlatform  = { xxxPlatform:Platform.OS +'' };
  //let a = params;
  //params = [ ...a, { xxxPlatform} ];

  console.log('POST '+ api +' data',params);
  Platform.OS == 'ios' && StatusBar.setNetworkActivityIndicatorVisible(true);
  return new Promise(function(resolve, reject) {
    const request = new XMLHttpRequest();
    let strParams = '';
    if (params) {
      Object.keys(params).map((param) => {
        strParams += '<' + param + '>' + params[param] + '</' + param + '>'; 
      });
    }


    strParams +='<xxxPlatform>' + Platform.OS + '</xxxPlatform>';
    var sr =
			'<soap:Envelope xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:xsd="http://www.w3.org/2001/XMLSchema" xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/">' +
			'<soap:Header>'+
				'<Authentication xmlns="http://tempuri.org/">'+	 			
				'<UserName>congtygeso</UserName>'+
				'<Password>congtygeso@123</Password>'+ 
				'</Authentication>'+
		  	'</soap:Header>'+ 
			'<soap:Body>' +
			'<' +
			api +
			' xmlns="http://tempuri.org/">' +
			strParams +
			'</' +
			api +
			'>' +
			'</soap:Body>' +
			'</soap:Envelope>';
    // console.log('sr '+ sr)
    request.onload = function() {
      Platform.OS == 'ios' &&
				StatusBar.setNetworkActivityIndicatorVisible(false);
				 console.log("Debug",this._response)
      // console.log("Status",this.status )
      if (this.status === 200) {
       
        let data = this._response.split('<' + api + 'Result>')[1];
        if (data) {
          data = data.split('</' + api + 'Result>')[0];
        } else {
          let dt = this._response.split('<' + api + 'Result />')[1];
          if (dt) {
            resolve({ data: [], error: false, });
          }
        }
         console.log(JSON.stringify(data))
        try {
          data = JSON.parse(data);
          console.log('response ' + api +' DATA',data);
        } catch (e) {
          data = data;
        }
        let Data = data;
        let res = {
          data: Data,
          error: false,
        };
        resolve(res);
      } else {
         console.log(this._response)
        resolve({
          error: true,
          status: this.status,
        });
        // Something went wrong (404 etc.)
        // reject(this.status);
      }
    };
    request.onerror = function() {
      Platform.OS == 'ios' &&
				StatusBar.setNetworkActivityIndicatorVisible(false);
      // console.log(this);
      resolve({
        error: true,
        status: this.status,
      });
    };

    request.open('POST', url, true);
    request.setRequestHeader('Content-Type', 'text/xml; charset=utf-8');
    request.responseType = 'json';
    request.send(sr);
  });
}

// export function post(api, params, callback) {

//   var xmlhttp = new XMLHttpRequest();
//   xmlhttp.open('POST', url, true);

//   // build SOAP request
//   var sr =
//     '<soap:Envelope xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:xsd="http://www.w3.org/2001/XMLSchema" xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/">'
//     + '<soap:Body>'
//     + '<' + api + 'xmlns="http://tempuri.org/">'
//     + '<secrect>' + secrect +'</secrect>'
//     + '</' +api + '>'
//     + '</soap:Body>'
//     + '</soap:Envelope>'

//   xmlhttp.onreadystatechange = function () {
//     if (xmlhttp.readyState == 4) {
//       if (xmlhttp.status == 200) {
//         let data = xmlhttp._response.split('<' + api +'Result>')[1];
//         data = data.split('<' + api +'Result>')[0];
//         callback(data)
//       }
//     }
//   }
//   // Send the POST request
//   xmlhttp.setRequestHeader('Content-Type', 'text/xml');
//   xmlhttp.setRequestHeader("SOAPAction", "http://tempuri.org/Get_Categories");
//   xmlhttp.send(sr);
// }

export function toDataUrl(url, callback) {
  var xhr = new XMLHttpRequest();
  xhr.open('GET', 'http://9mobi.vn/cf/images/2015/03/nkk/anh-dep-1.jpg', true);

  xhr.responseType = 'arraybuffer';

  xhr.onload = function(e) {
    if (this.status == 200) {
      var uInt8Array = new Uint8Array(this.response);
      var i = uInt8Array.length;
      var binaryString = new Array(i);
      while (i--) {
        binaryString[i] = String.fromCharCode(uInt8Array[i]);
      }
      var data = binaryString.join('');

      var base64 = encode(data);
      // console.log(base64)
      callback(base64);
      // document.getElementById("myImage").src="data:image/png;base64,"+base64;
    }
  };

  xhr.send();
}

function encode(input) {
  // Create Base64 Object
  const chars =
		'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=';

  let str = input;
  let output = '';

  for (
    let block = 0, charCode, i = 0, map = chars;
    str.charAt(i | 0) || ((map = '='), i % 1);
    output += map.charAt(63 & (block >> (8 - (i % 1) * 8)))
  ) {
    charCode = str.charCodeAt((i += 3 / 4));

    if (charCode > 0xff) {
      throw new Error(
        '\'btoa\' failed: The string to be encoded contains characters outside of the Latin1 range.',
      );
    }

    block = (block << 8) | charCode;
  }

  return output;
}

export function xmlToJson(xml) {
  // Create the return object
  var obj = {};

  if (xml.nodeType == 1) {
    // element
    // do attributes
    if (xml.attributes.length > 0) {
      obj['@attributes'] = {};
      for (var j = 0; j < xml.attributes.length; j++) {
        var attribute = xml.attributes.item(j);
        obj['@attributes'][attribute.nodeName] = attribute.nodeValue;
      }
    }
  } else if (xml.nodeType == 3) {
    // text
    obj = xml.nodeValue;
  }

  // do children
  // If just one text node inside
  if (
    xml.hasChildNodes() &&
		xml.childNodes.length === 1 &&
		xml.childNodes[0].nodeType === 3
  ) {
    obj = xml.childNodes[0].nodeValue;
  } else if (xml.hasChildNodes()) {
    for (var i = 0; i < xml.childNodes.length; i++) {
      var item = xml.childNodes.item(i);
      var nodeName = item.nodeName;
      if (typeof obj[nodeName] == 'undefined') {
        obj[nodeName] = xmlToJson(item);
      } else {
        if (typeof obj[nodeName].push == 'undefined') {
          var old = obj[nodeName];
          obj[nodeName] = [];
          obj[nodeName].push(old);
        }
        obj[nodeName].push(xmlToJson(item));
      }
    }
  }
  return obj;
}

export const modifyXML = (xml) => {
  const posElement = xml.indexOf('<DocumentElement');
  if (posElement !== -1) {
    return xml.slice(posElement).replace('</diffgr:diffgram>', '');
  }
  return [];
};
export function removeAccents(str) {
  var AccentsMap = [
    "aàảãáạăằẳẵắặâầẩẫấậ",
    "AÀẢÃÁẠĂẰẲẴẮẶÂẦẨẪẤẬ",
    "dđ", "DĐ",
    "eèẻẽéẹêềểễếệ",
    "EÈẺẼÉẸÊỀỂỄẾỆ",
    "iìỉĩíị",
    "IÌỈĨÍỊ",
    "oòỏõóọôồổỗốộơờởỡớợ",
    "OÒỎÕÓỌÔỒỔỖỐỘƠỜỞỠỚỢ",
    "uùủũúụưừửữứự",
    "UÙỦŨÚỤƯỪỬỮỨỰ",
    "yỳỷỹýỵ",
    "YỲỶỸÝỴ"    
  ];
  for (var i=0; i<AccentsMap.length; i++) {
    var re = new RegExp('[' + AccentsMap[i].substr(1) + ']', 'g');
    var char = AccentsMap[i][0];
    str = str.replace(re, char);
  }
  return str;
}