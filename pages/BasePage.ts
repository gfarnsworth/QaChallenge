import { browser, protractor, WebElement, $$ } from 'protractor';
import { logging, IWebDriverOptionsCookie } from 'selenium-webdriver';

export class BasePage {
  //Page Actions
  async OpenBrowser(url: string) {
    await browser.get(url);
  }

  async getConsoleLog(): Promise<logging.Entry[]> {
    return await browser
      .manage()
      .logs()
      .get('browser');
  }

  async checkExternalLink(): Promise<string> {
    await browser.sleep(500);
    const tabs = await browser.driver.getAllWindowHandles();
    await browser.driver.switchTo().window(tabs[1]);
    const url = await browser.driver.getCurrentUrl();
    await browser.close();
    await browser.driver.switchTo().window(tabs[0]);
    await browser.refresh();
    return url;
  }

  async getCookies(): Promise<IWebDriverOptionsCookie[]> {
    return await browser.manage().getCookies();
  }

  async getDTValueCookie(): Promise<IWebDriverOptionsCookie> {
    return await browser.manage().getCookie('dtvals');
  }

  async decodeBase64(code: string): Promise<String>  {
    return (await Buffer.from(code, 'base64')).toString();
  }

  async GetURL(): Promise<string> {
    return await browser.getCurrentUrl();
  }

  async getText(el: WebElement): Promise<string> {
    return await el.getText();
  }

  async sendEnterKey() {
    await browser
      .actions()
      .sendKeys(protractor.Key.ENTER)
      .perform();
  }

  async sendTabKey() {
    await browser
      .actions()
      .sendKeys(protractor.Key.TAB)
      .perform();
  }

  async scrollIntoView(el: WebElement) {
    await browser.executeScript('arguments[0].scrollIntoView();', el);
  }

  async waitForPage(el: string) {
    const ec = browser.ExpectedConditions;
    await browser.wait(ec.elementToBeClickable($$(el).first()));
  }

  async enterInput(input: string, element: WebElement) {
    await element.click();
    await element.clear();
    await element.sendKeys(input);
  }
}
