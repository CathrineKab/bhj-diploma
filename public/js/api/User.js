/**
 * Класс User управляет авторизацией, выходом и
 * регистрацией пользователя из приложения
 * Имеет свойство URL, равное '/user'.
 * */
  class User {
    static URL = '/user'

    static STORAGE_KEY = 'user'
    
  /**
   * Устанавливает текущего пользователя в
   * локальном хранилище.
   * */
  static setCurrent(user) {
    if (!user) {
      return;
    }

    localStorage.setItem(User.STORAGE_KEY, JSON.stringify(user));
  }


  /**
   * Удаляет информацию об авторизованном
   * пользователе из локального хранилища.
   * */
  static unsetCurrent() {
    localStorage.removeItem(User.STORAGE_KEY)
  }

  /**
   * Возвращает текущего авторизованного пользователя
   * из локального хранилища
   * */
  static current() {
    try {
      return JSON.parse(localStorage.getItem(User.STORAGE_KEY));
    } catch (error) {
       return null;
     }
   }

  /**
   * Получает информацию о текущем
   * авторизованном пользователе.
   * */
 static fetch(callback) {
   createRequest({
      url: `${User.URL}/current`,
      method: 'GET',
      callback(err, response) {
        User.onUserDataFetch(err, response, callback);
      }
    })
  }

  /**
   * Производит попытку авторизации.
   * После успешной авторизации необходимо
   * сохранить пользователя через метод
   * User.setCurrent.
   * */
  static login(data, callback) {
     createRequest({
      url: this.URL + '/login',
      method: 'POST',
      data,
      callback(err, response) {
        User.onUserDataFetch(err, response, callback);
      }
    });
  }

  /**
   * Производит попытку регистрации пользователя.
   * После успешной авторизации необходимо
   * сохранить пользователя через метод
   * User.setCurrent.
   * */
static register(data, callback) {
  createRequest({
      url: `${User.URL}/register`,
      method: 'POST',
      data,
      callback,
    });
  }
    
  /**
   * Производит выход из приложения. После успешного
   * выхода необходимо вызвать метод User.unsetCurrent
   * */
  static logout(callback) {
    createRequest({
      url: `${User.URL}/logout`,
      method: 'POST',
      callback(err, response) {
        if (response && response.success) {
          User.unsetCurrent();
         }
        callback(err, response);
      }
    });
  }

 static onUserDataFetch(err, response, callback) {
    if (response && response.user) {
      User.setCurrent(response.user);
    }
    callback(err, response);
  }
}
