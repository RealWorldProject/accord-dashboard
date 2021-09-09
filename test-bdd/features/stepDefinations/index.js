const { expect } = require("chai");
const { Given, When, Then, Before, After } = require("@cucumber/cucumber");
const { Builder, By, Key, until, sleep, Browser } = require("selenium-webdriver");
const { delay } = require("../utils/delay");
const { keys } = require("@material-ui/core/styles/createBreakpoints");

Given("Test login functionality", { timeout: 30000 }, async function () {
  let driver = await new Builder().forBrowser("MicrosoftEdge").build();
  await driver.get("http://localhost:3000/login");
  await driver.findElement(By.id("username")).sendKeys("superuser@accord.com");
  await driver.findElement(By.id("password")).sendKeys("superuser123");
  await driver.findElement(By.id("loginBtn")).click();
  await driver.sleep(delay);
  await driver.navigate().refresh();

  await driver.wait(until.elementLocated(By.xpath('//*[@id="root"]/div/div/header/div/div[1]/div/h6')), 300);
  expect(await driver.wait(until.elementLocated(By.xpath('//*[@id="root"]/div/div/header/div/div[1]/div/h6'))));
  // await driver.quit();
});

// Given("Test Add Category functionality", { timeout: 50000 }, async function () {
//   let driver = await new Builder().forBrowser("chrome").build();
//   await driver.get("http://localhost:3000/categories");
//   await driver.findElement(By.id("username")).sendKeys("superuser@accord.com");
//   await driver.findElement(By.id("password")).sendKeys("superuser123");
//   await driver.findElement(By.id("loginBtn")).click();
//   await driver.sleep(delay);
//   await driver.navigate().refresh();
//   await driver.findElement(By.xpath('//*[@id="root"]/div/div[1]/div/div/div[2]/ul[1]/a[3]')).click();
//   await driver.sleep(delay);
//   await driver.findElement(By.xpath('//*[@id="root"]/div/div[1]/main/div[2]/button')).click();
//   await driver.findElement(By.id("category")).sendKeys("mystery");
//   await driver.findElement(By.xpath('/html/body/div[2]/div[3]/div/div[2]/div[3]')).click();
//   await driver.sleep(delay);
//   await driver.sleep(delay);
//   await driver.findElement(By.xpath('/html/body/div[2]/div[3]/div/div[3]/button[1]')).click();
//   await driver.sleep(delay);
  
//   await driver.wait(until.elementLocated(By.xpath('//*[@id="MUIDataTableBodyRow-7"]/td[2]/div[2]')), 300);
//   expect(await driver.wait(until.elementLocated(By.xpath('//*[@id="MUIDataTableBodyRow-7"]/td[2]/div[2]'))));
//   // await driver.quit();
// });

// Given("Test Update Category functionality", { timeout: 50000 }, async function () {
//   let driver = await new Builder().forBrowser("chrome").build();
//   await driver.get("http://localhost:3000/categories");
//   await driver.findElement(By.id("username")).sendKeys("superuser@accord.com");
//   await driver.findElement(By.id("password")).sendKeys("superuser123");
//   await driver.findElement(By.id("loginBtn")).click();
//   await driver.sleep(delay);
//   await driver.navigate().refresh();
//   await driver.findElement(By.xpath('//*[@id="root"]/div/div[1]/div/div/div[2]/ul[1]/a[3]')).click();
//   await driver.sleep(delay);
//   await driver.findElement(By.xpath('//*[@id="MUIDataTableBodyRow-0"]/td[4]/div[2]/div/button[1]')).click();
//   await driver.findElement(By.id("category")).sendKeys(" Updated");
//   await driver.findElement(By.xpath('/html/body/div[2]/div[3]/div/div[3]/button[1]/span[1]')).click();
//   await driver.sleep(delay);
//   await driver.navigate().refresh();
  
//   await driver.wait(until.elementLocated(By.xpath('//*[@id="root"]/div/div[2]')), 300);
//   expect(await driver.wait(until.elementLocated(By.xpath('//*[@id="root"]/div/div[2]'))));
//   // await driver.quit();
// });

// Given("Test Delete Category functionality", { timeout: 50000 }, async function () {
//   let driver = await new Builder().forBrowser("chrome").build();
//   await driver.get("http://localhost:3000/categories");
//   await driver.findElement(By.id("username")).sendKeys("superuser@accord.com");
//   await driver.findElement(By.id("password")).sendKeys("superuser123");
//   await driver.findElement(By.id("loginBtn")).click();
//   await driver.sleep(delay);
//   await driver.navigate().refresh();
//   await driver.findElement(By.xpath('//*[@id="root"]/div/div[1]/div/div/div[2]/ul[1]/a[3]')).click();
//   await driver.sleep(delay);
//   await driver.findElement(By.xpath('//*[@id="MUIDataTableBodyRow-6"]/td[4]/div[2]/div/button[2]/span[1]')).click();
//   await driver.findElement(By.xpath('/html/body/div[2]/div[3]/div/div[2]/button[2]/span[1]')).click();

//   await driver.wait(until.elementLocated(By.xpath('//*[@id="root"]/div/div[2]')), 300);
//   expect(await driver.wait(until.elementLocated(By.xpath('//*[@id="root"]/div/div[2]'))));
//   // await driver.quit();
// });

// Given("Test Verify Books functionality", { timeout: 50000 }, async function () {
//   let driver = await new Builder().forBrowser("chrome").build();
//   await driver.get("http://localhost:3000/books");
//   await driver.findElement(By.id("username")).sendKeys("superuser@accord.com");
//   await driver.findElement(By.id("password")).sendKeys("superuser123");
//   await driver.findElement(By.id("loginBtn")).click();
//   await driver.sleep(delay);
//   await driver.navigate().refresh();
//   await driver.findElement(By.xpath('//*[@id="root"]/div/div[1]/div/div/div[2]/ul[1]/a[2]/div/div[2]/span')).click();
//   await driver.sleep(delay);
//   await driver.findElement(By.xpath('//*[@id="MUIDataTableBodyRow-0"]/td[5]/div[2]/div/button[1]/span[1]')).click();

//   await driver.wait(until.elementLocated(By.xpath('//*[@id="root"]/div/div[2]')), 300);
//   expect(await driver.wait(until.elementLocated(By.xpath('//*[@id="root"]/div/div[2]'))));
//   // await driver.quit();
// });

// Given("Test Reject Books functionality", { timeout: 50000 }, async function () {
//   let driver = await new Builder().forBrowser("chrome").build();
//   await driver.get("http://localhost:3000/books");
//   await driver.findElement(By.id("username")).sendKeys("superuser@accord.com");
//   await driver.findElement(By.id("password")).sendKeys("superuser123");
//   await driver.findElement(By.id("loginBtn")).click();
//   await driver.sleep(delay);
//   await driver.navigate().refresh();
//   await driver.findElement(By.xpath('//*[@id="root"]/div/div[1]/div/div/div[2]/ul[1]/a[2]/div/div[2]/span')).click();
//   await driver.sleep(delay);
//   await driver.findElement(By.xpath('//*[@id="MUIDataTableBodyRow-6"]/td[5]/div[2]/div/button[2]/span[1]')).click();
//   await driver.findElement(By.xpath('//*[@id="rejectionMessage"]')).sendKeys("Please update your book details");
//   await driver.findElement(By.xpath('/html/body/div[2]/div[3]/div/div[3]/button[2]/span[1]')).click();

//   await driver.wait(until.elementLocated(By.xpath('//*[@id="root"]/div/div[2]')), 300);
//   expect(await driver.wait(until.elementLocated(By.xpath('//*[@id="root"]/div/div[2]'))));
//   // await driver.quit();
// });

// Given("Test View Orders functionality", { timeout: 50000 }, async function () {
//   let driver = await new Builder().forBrowser("chrome").build();
//   await driver.get("http://localhost:3000/orders");
//   await driver.findElement(By.id("username")).sendKeys("superuser@accord.com");
//   await driver.findElement(By.id("password")).sendKeys("superuser123");
//   await driver.findElement(By.id("loginBtn")).click();
//   await driver.sleep(delay);
//   await driver.navigate().refresh();
//   await driver.findElement(By.xpath('//*[@id="root"]/div/div/div/div/div[2]/ul[2]/a[2]/div/div[2]/span')).click();
//   await driver.sleep(delay);
//   await driver.findElement(By.xpath('//*[@id="MUIDataTableBodyRow-0"]/td[4]/div[2]/div/button/span[1]')).click();

//   await driver.wait(until.elementLocated(By.xpath('/html/body/div[3]/div[3]/div/div[2]/h6')), 300);
//   expect(await driver.wait(until.elementLocated(By.xpath('/html/body/div[3]/div[3]/div/div[2]/h6'))));
//   // await driver.quit();
// });

// Given("Test Sort Book functionality", { timeout: 50000 }, async function () {
//   let driver = await new Builder().forBrowser("chrome").build();
//   await driver.get("http://localhost:3000/books");
//   await driver.findElement(By.id("username")).sendKeys("superuser@accord.com");
//   await driver.findElement(By.id("password")).sendKeys("superuser123");
//   await driver.findElement(By.id("loginBtn")).click();
//   await driver.sleep(delay);
//   await driver.navigate().refresh();
//   await driver.findElement(By.xpath('//*[@id="root"]/div/div/div/div/div[2]/ul[1]/a[2]/div/div[2]/span')).click();
//   await driver.sleep(delay);
//   await driver.findElement(By.xpath('//*[@id="root"]/div/div/main/div[2]/div/div[1]/div[2]/div/fieldset/div/label[2]/span[1]/span[1]/input')).click();
//   await driver.sleep(delay);

//   await driver.wait(until.elementLocated(By.xpath('//*[@id="MUIDataTableBodyRow-0"]/td[3]/div[2]')), 300);
//   expect(await driver.wait(until.elementLocated(By.xpath('//*[@id="MUIDataTableBodyRow-0"]/td[3]/div[2]'))));
//   // await driver.quit();
// });

// Given("Test Suspend User functionality", { timeout: 50000 }, async function () {
//   let driver = await new Builder().forBrowser("chrome").build();
//   await driver.get("http://localhost:3000/users");
//   await driver.findElement(By.id("username")).sendKeys("superuser@accord.com");
//   await driver.findElement(By.id("password")).sendKeys("superuser123");
//   await driver.findElement(By.id("loginBtn")).click();
//   await driver.sleep(delay);
//   await driver.navigate().refresh();
//   await driver.findElement(By.xpath('//*[@id="root"]/div/div/div/div/div[2]/ul[2]/a[1]/div/div[2]/span')).click();
//   await driver.sleep(delay);
//   await driver.findElement(By.xpath('//*[@id="MUIDataTableBodyRow-6"]/td[3]/div[2]/div/button/span[1]')).click();
//   await driver.findElement(By.id("rejectionMessage")).sendKeys("Suspended due to malicious activities");
//   await driver.sleep(1000);
//   await driver.findElement(By.xpath('/html/body/div[3]/div[3]/div/div[3]/button[2]/span[1]')).click();
//   await driver.sleep(1000);

//   await driver.wait(until.elementLocated(By.xpath('//*[@id="root"]/div/div/div/div/div[3]/div/div/div[2]')), 300);
//   expect(await driver.wait(until.elementLocated(By.xpath('//*[@id="root"]/div/div/div/div/div[3]/div/div/div[2]'))));
//   // await driver.quit();
// });
