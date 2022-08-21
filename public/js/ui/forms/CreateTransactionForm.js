/**
 * Класс CreateTransactionForm управляет формой
 * создания новой транзакции
 * */
class CreateTransactionForm extends AsyncForm {
  /**
   * Вызывает родительский конструктор и
   * метод renderAccountsList
   * */
  constructor(element) {
    super(element);
    this.parent = element.closest('.modal');
    this.accountsList = this.element.querySelector('[name="account_id"]');
    this.renderAccountsList();
  }

  /**
   * Получает список счетов с помощью Account.list
   * Обновляет в форме всплывающего окна выпадающий список
   * */
  renderAccountsList() {
    if (!this.accountsList) {
      return;
    }

    Account.list({}, (err, res) => {
      if (err) {
        throw new Error(err);
      }

      if (!res.success || res.data.length === 0) {
        return;
      }

      const accountsSelect = res.data.reduce((prev, item) => prev + this.getAccountHtml(item), '');

      this.accountsList.innerHTML = accountsSelect;
    });

  /**
   * Создаёт новую транзакцию (доход или расход)
   * с помощью Transaction.create. По успешному результату
   * вызывает App.update(), сбрасывает форму и закрывает окно,
   * в котором находится форма
   * */
  onSubmit(data) {
   Transaction.create(data, (err, response) => {
      if (response && response.success) {
        App.update();
        this.element.reset();
        App.getModal('newIncome').close();
        App.getModal('newExpense').close();
      } else console.log(`Ошибка ${err}`);
    });
  }
}
