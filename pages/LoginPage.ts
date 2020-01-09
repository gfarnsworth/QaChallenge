import { $ } from 'protractor';
import { BasePage } from './BasePage';

export class LoginPage extends BasePage {
  //Page Elements
  UserName = $('.form-username');
  Password = $('.form-password');
  LoginButton = $('.btn-primary');
  awaitElement = '.btn-primary'

  //Page Actions
  async Login(username: string, password: string) {
    await this.enterInput(username, this.UserName);
    await this.enterInput(password, this.Password);
    await this.scrollIntoView(this.LoginButton);
    await this.LoginButton.click();
  }
}
