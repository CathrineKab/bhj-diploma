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
        throw new Error('Не указан url запроса');
    }

    if (!option.method) {
        throw new Error('Не указан метод запроса');
    }

    const { queryString, formData } = getRequestDataByMethod(method, data);

    const reuestUrl = `${url}${queryString.length > 0 ? '?' + queryString : ''}`;

    const xhr = new XMLHttpRequest();
    xhr.responseType = responseType ?? JSON_RESPONSE_TYPE;

    xhr.onload = function () {
        if (!isCorrectCallback(callback)) {
            return;
        }

        try {
            if (xhr.status === 200) {
                callback(null, xhr.response);
            } else {
                callback(new Error(`${xhr.status}: ${xhr.statusText}`));
            }
        } catch (error) {
            callback(new Error(error));
        }
    };

    xhr.open(method, reuestUrl);

    if (isGetMethod(method)) {
        xhr.send();
        return;
    }

    xhr.send(formData);
};
