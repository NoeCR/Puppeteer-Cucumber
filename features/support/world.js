const { setWorldConstructor } = require('cucumber');
const { expect } = require('chai');
const puppeteer = require('puppeteer');

class CustomWorld {
  async launchBrowser() {
    this.browser = await puppeteer.launch({
      headless: false,
      slowMo: 10,
      args: [
        "--no-sandbox",
        "--disable-setui-sandbox",
        "--disable-web-security",
        "--window-size=1920,1080"
      ],
      defaultViewport: null,
    });
    this.page = await this.browser.newPage();
  }

  async closeBrowser() {
    await this.browser.close();
  }

  async visit() {
    await this.page.goto('http://zero.webappsecurity.com/login.html', { waitUntil: 'domcontentloaded' });
  }

  async fillLoginForm() {
    await this.page.waitForSelector([
      '#user_login',
      '#user_password',
      '#user_remember_me',
      'input[type=submit]'
    ].join(','));
    await this.page.type('#user_login', 'username');
    await this.page.type('#user_password', 'password');
    await this.page.click('#user_remember_me');
  }

  async submitLogin() {
    await this.page.click('input[type=submit]');
  }

  async verifySuccessLogin() {
    await this.page.waitForSelector('.nav-tabs li');
    expect(await this.page.$$eval('.nav-tabs li', el => el.length)).to.equal(6);
  }
}

setWorldConstructor(CustomWorld);
