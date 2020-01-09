import { urls } from '../../helpers/URLS';
import { LoginPage } from '../../pages/LoginPage';
import { HomePage, } from '../../pages/HomePage';
import { browser } from 'protractor';
import { persons } from '../../helpers/Person';
import {} from 'jasmine';

const home = new HomePage();
const login = new LoginPage();
const username = 'testUser';
const password = 'Test1234';
const person = persons[0];

describe('Home Page Smoke Tests', async () => {
  beforeEach(async () => {
    await browser.get('file:///C:/Users/gfarnsw/Google%20Drive/Paylocity%20QA%20Interview%20Challenge/home.html');
    await login.waitForPage(login.awaitElement);
    await login.Login(username, password);
    await home.waitForPage(home.awaitElement);
  });

  it('Should add Employee no Discount', async () => {
    await home.AddEmployee(person.firstName, person.lastName, person.dependents)
    //Here I would make sure the table contained the new employee
    //expect(home.GetEmployeeFirstName).toContain(person.firstName)
    expect(home.GetEmployeeFirstName()).toBe(person.firstName);
  });
});