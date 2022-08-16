/**
 * Основная функция для совершения запросов
 * на сервер.
 * */
const createRequest = (options = {}) => {
    const xhr = new XMLHttpRequest();
    const formData = new FormData();

    xhr.responseType = 'json';

    if (options.method === 'GET') {
        options.url += '?';

        for (let i in options.data) {
            options.url += `${i}=${options.data[i]}&`;
        }
    } else {
        for (let i in options.data) {
            formData.append(i, options.data[i]);
        }
    }

    try {
        xhr.open(options.method, options.url);
        if (options.method === 'GET') {
            xhr.send();
        } else xhr.send(formData);
    } catch (error) {
        options.callback(error);
    }

    xhr.onreadystatechange = () => {
        let err = null;

        if (xhr.readyState === 4 && xhr.status === 200) {
            options.callback(err, xhr.response);
        } else err = new Error('Что-то пошло не так...');
    } 
}