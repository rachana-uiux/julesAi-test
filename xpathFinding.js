import { Builder, By, until } from 'selenium-webdriver';
import assert from 'assert';

(async function testSuccessfulLogin() {
    let driver = await new Builder().forBrowser('chrome').build();
    try {
        await driver.manage().window().maximize();
        await driver.get('https://selectorshub.com/iframe-in-shadow-dom/'); 
        let actions = driver.actions();
        // Move the cursor to the element
    
        await actions.move().perform();
        let shadowHost1 = await driver.findElement(By.css('#userName'));
        let shadowRoot1 = await driver.executeScript('return arguments[0].shadowRoot', shadowHost1);
        await driver.sleep(1000); // Sleep to mimic Thread.sleep

        // Find the nested shadow host #app2 within the first shadow root and get its shadow root

        let shadowHost2 = await shadowRoot1.findElement(By.css('#app2'));
        let shadowRoot2 = await driver.executeScript('return arguments[0].shadowRoot', shadowHost2);
        await driver.sleep(1000); // Sleep to mimic Thread.sleep
    
        // Find the element #pizza within the second shadow root
        let pizzaElement = await shadowRoot2.findElement(By.css('#pizza'));
        await driver.sleep(1000);
        console.log(await pizzaElement.click());
        console.log("Test Successful: Clicked on the element which is under DOM")

    }finally {
            await driver.quit();
        }
})();
