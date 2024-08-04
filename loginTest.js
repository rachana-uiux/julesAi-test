import { should } from 'chai';

import { Builder, By, until } from 'selenium-webdriver';
import assert from 'assert';

(async function testSuccessfulLogin() {
    let driver = await new Builder().forBrowser('chrome').build();
    try {
         // Test 1: Successful Login
        let url = await driver.get('https://demo.haroldwaste.com/'); 
        await driver.wait(until.elementLocated(By.name('email')), 50000);
        await driver.findElement(By.name('email')).sendKeys('qa@julesai.com'); 
        await driver.findElement(By.name('password')).sendKeys('QaJULES2023!'); 
        await driver.findElement(By.className('MuiButtonBase-root MuiButton-root MuiButton-contained jss10 jss11 MuiButton-containedPrimary')).click(); 
        // Wait for login to complete and validate successful login
        await driver.wait(until.elementLocated(By.className('UserAvatar--inner')),50000);
        let currentUrl = await driver.getCurrentUrl();
        assert(currentUrl.includes('/purchases'),'Login failed: Redirect URL does not match'); 
        console.log('Test 1 Passed: Login successful');

        //Logout from the application
        await driver.findElement(By.className('UserAvatar--inner')).click();
        await driver.findElement(By.xpath(`//*[@id="simple-popover"]/div[3]/div/ul/li[2]/div[2]`)).click();
        await driver.wait(until.elementLocated(By.name('email')), 50000);

        //Test 2: Invalid Credentials
        await driver.get('https://demo.haroldwaste.com/'); 
        await driver.wait(until.elementLocated(By.name('email')), 50000);
        await driver.findElement(By.name('email')).sendKeys('qa@julesai.com'); 
        await driver.findElement(By.name('password')).sendKeys('QaJLES2023!'); 
        await driver.findElement(By.className('MuiButtonBase-root MuiButton-root MuiButton-contained jss10 jss11 MuiButton-containedPrimary')).click(); 
        // Wait for error message to pop up
        await driver.wait(until.elementLocated(By.xpath('//*[@id="notistack-snackbar"]/div')), 5000);
        let errormessage = await driver.findElement(By.xpath('//*[@id="notistack-snackbar"]/div')).getText();
        assert(errormessage.includes('Your email and/or password are incorrects'), 'Invalid credentials error message not displayed');
        console.log('Test 2 Passed: Invalid credentials handled correctly');

        //Test3: Empty Fields
        await driver.get('https://demo.haroldwaste.com/');
        await driver.findElement(By.name('email')).sendKeys(''); 
        await driver.findElement(By.name('password')).sendKeys('');
        await driver.wait(until.elementLocated(By.xpath('//*[@id="root"]/div/div[2]/form/div/div/div[1]/div[3]')), 50000);
        let requiredmessage = await driver.findElement(By.xpath('//*[@id="root"]/div/div[2]/form/div/div/div[1]/div[3]')).getText();
        assert(requiredmessage.includes('Required'), 'Empty fields error message not displayed');
        console.log('Test 3 Passed: ErrorMessage for required field is visible')
    } finally {
        await driver.quit();
    }
})();
