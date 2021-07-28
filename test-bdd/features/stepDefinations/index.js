const { expect } = require("chai");
const { Given, When, Then, Before, After } = require("@cucumber/cucumber");
const { Builder, By, Key, until, sleep, Browser } = require("selenium-webdriver");
const { delay } = require("../utils/delay");

// Given("Test login functionality", { timeout: 30000 }, async function () {
//   let driver = await new Builder().forBrowser("chrome").build();
//   await driver.get("http://localhost:3000/login");
//   await driver.findElement(By.id("username")).sendKeys("daya@fattepur.com");
//   await driver.findElement(By.id("password")).sendKeys("mangocake");
//   await driver.findElement(By.id("loginBtn")).click();

//   await driver.wait(until.elementLocated(By.xpath('//*[@id="root"]/div/div[1]/header/div/h6')), 300);
//   expect(await driver.wait(until.elementLocated(By.xpath('//*[@id="root"]/div/div[1]/header/div/h6'))));
//   // await driver.quit();
// });

Given("Test Add Category functionality", { timeout: 50000 }, async function () {
  let driver = await new Builder().forBrowser("chrome").build();
  await driver.get("http://localhost:3000/categories");
  await driver.findElement(By.id("username")).sendKeys("superuser@accord.com");
  await driver.findElement(By.id("password")).sendKeys("superuser123");
  await driver.findElement(By.id("loginBtn")).click();
  await driver.sleep(delay);
  await driver.navigate().refresh();
  await driver.findElement(By.xpath('//*[@id="root"]/div/div[1]/div/div/div[2]/ul[1]/a[3]')).click();
  await driver.sleep(delay);
  await driver.findElement(By.xpath('//*[@id="root"]/div/div[1]/main/div[2]/button')).click();
  await driver.findElement(By.id("category")).sendKeys("mystery");
  await driver.findElement(By.xpath('/html/body/div[2]/div[3]/div/div[2]/div[3]')).click();
  await driver.sleep(delay);
  await driver.sleep(delay);
  await driver.findElement(By.xpath('/html/body/div[2]/div[3]/div/div[3]/button[1]')).click();
  await driver.sleep(delay);
  
  await driver.wait(until.elementLocated(By.xpath('//*[@id="MUIDataTableBodyRow-7"]/td[2]/div[2]')), 300);
  expect(await driver.wait(until.elementLocated(By.xpath('//*[@id="MUIDataTableBodyRow-7"]/td[2]/div[2]'))));
  // await driver.quit();
});
