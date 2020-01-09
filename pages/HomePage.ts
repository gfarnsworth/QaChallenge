import { $, $$, element, by } from 'protractor';
import { BasePage } from './BasePage';

export class HomePage extends BasePage {
  //Page Elements
  AddEmployeeButton = $('[id="btnAddEmployee"]')
  awaitElement = '[id="btnAddEmployee"]';
  awaitModal = '.form-horizontal .btn-primary';
  FirstName = $$('.form-horizontal .form-control').get(0);
  LastName = $$('.form-horizontal .form-control').get(1);
  Dependents = $$('.form-horizontal .form-control').get(2);;
  ModalSubmitButton = $('.form-horizontal .btn-primary');
  ModalCancelButton = $('.form-horizontal .btn-default');
  EmployeeTable = $('[id="employee-table"]');
  
  //Page Actions
  async AddEmployee(firstname: string, lastname: string, dependents: string) {
    await this.AddEmployeeButton.click();
    await this.waitForPage(this.awaitModal);
    await this.enterInput(firstname, this.FirstName);
    await this.enterInput(lastname, this.LastName);
    await this.enterInput(dependents, this.Dependents);
    await this.ModalSubmitButton.click();
  }

  GetEmployeeFirstName() {
    //Ideally I would have something like this to go through each row of the table but for now I will mock the return
    //await element.all(by.repeater('[id="employee-table"]')).each(function(row){
    //  return row.getText();
    const firstname = 'Marvin'
    return firstname;
  }
}
