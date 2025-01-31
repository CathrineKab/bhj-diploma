const JSON_RESPONSE_TYPE = 'json';

const GET_METHOD = 'GET';

const isGetMethod = (method) => method.toUpperCase() === GET_METHOD;

const buildQueryString = (data = {}) => Object
.entries(data)
.reduce((queryStringParams, [key, val]) => { 
     queryStringParams.push(`${encodeURIComponent(key)}=${encodeURIComponent(val)}`);
     return queryStringParams;
 }, [])
 .join('&');

const buildFormData = (data = {}) => {
    if (!data) {
        return new FormData();
    }

    const formData = new FormData();

    Object.entries(data).forEach(([key, val]) => {
        formData.append(key, val);
    });

    return formData;
};

const getRequestDataByMethod = (method, data) => {
    if (isGetMethod(method)) {
        return {
            queryString: buildQueryString(data),
            formData: null,
        };
    }

    return {
        queryString: '',
        formData: buildFormData(data),
    }
};

const isCorrectCallback = (callback) => callback && typeof callback === 'function';

/**
 * Основная функция для совершения запросов
 * на сервер.
 * */
const createRequest = (options = {}) => {
  const { url, method, data, callback, responseType } = option;
    if (!option.url) {
      return console.log ('Не указан url запроса');
      }
    if (!option.method) {
      return console.log ('Не указан метод запроса');
     }
     
  const { queryString, formData } = getRequestDataByMethod(method, data);

  const reuestUrl = `${url}${queryString.length > 0 ? '?' + queryString : ''}`;

  const xhr = new XMLHttpRequest();
     
  xhr.responseType = responseType ?? JSON_RESPONSE_TYPE;

  xhr.onload = function () {
    options.callback(null, xhr.response);
   };
  xhr.onerror = function () {
    options.callback(xhr.response, null);
   };
  xhr.open(method, reuestUrl);
    
  if (isGetMethod(method)) {
    xhr.send();
    return;
   }
 xhr.send(formData);
};
