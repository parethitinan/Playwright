

import { test, expect } from '@playwright/test'
const { BmiPage } = require('../pages/BmiPage');

const dataForWebinput = {
    "number": "12569",
    "text": "it is test text",
    "password": "password should unseen",
    "date": "03-21-2003"
}

let bmiPage;

// test.beforeEach(async ({ page }) => {
//     // await page.goto('https://practice.expandtesting.com/');
//     bmiPage = new BmiPage();
//     await page.goto('https://practice.expandtesting.com/bmi');
// });



// test.beforeEach(async ({ page }) => {
//     // Initialize the BmiPage class
//     bmiPage = new BmiPage();
// });


test('Webinput-tc01', async ({ page }) => {
    // const closeAdButton = page.getByLabel('Close ad');

    // try {
    //     (await closeAdButton.count() > 0)
    //     await closeAdButton.click();
    //     console.log('Ad closed');

    // } catch (e) {
    //     console.log('No ad found');
    // }

    await page.goto('https://practice.expandtesting.com/inputs');
    // await page.getByRole('link', { name: 'Web inputs' }).click();
    await expect(page.getByRole('heading', { name: 'Web inputs page for Automation Testing Practice' })).toBeVisible();

    await page.fill('#input-number', dataForWebinput.number);
    await page.fill('#input-text', dataForWebinput.text);
    await page.fill('#input-password', dataForWebinput.password);
    await page.locator('#btn-display-inputs').click()

    const resultElement = await page.locator('#result');
    await expect(resultElement).toBeVisible();
    // await expect(page.locator('#error', { name: 'Your username is invalid!', exact: true })).toBeVisible();
    // await page.locator('#username').fill(datatest.username.invalid);
    // await page.locator('#password').fill(datatest.password.valid);
    // await page.getByRole('button').click({ force: true });
    // await expect(page.locator('#error', { name: 'Your username is invalid!', exact: true })).toBeVisible();

    await expect(page.locator('#output-number')).toHaveText(dataForWebinput.number);
    await expect(page.locator('#output-text')).toHaveText(dataForWebinput.text);
    await expect(page.locator('#output-password')).toHaveText(dataForWebinput.password);
});


test('Webinput-tc02', async ({ page }) => {
    await page.goto('https://practice.expandtesting.com/inputs');

    await page.fill('#input-number', dataForWebinput.number);
    await page.fill('#input-text', dataForWebinput.text);
    await page.fill('#input-password', dataForWebinput.password);
    await page.locator('#btn-display-inputs').click();
    await page.getByRole('button', { name: 'Clear Inputs' }).click();

    // await expect(page.locator('#result')).toBeHidden();

    const inputs = page.locator('.page-layout > .container input');
    const count = await inputs.count();
    for (let i = 0; i < count; i++) {
        const inputValue = await inputs.nth(i).inputValue();
        expect(inputValue).toBe('');
    }


});

test('RadioButtons-tc01', async ({ page }) => {
    await page.goto('https://practice.expandtesting.com/radio-buttons');
    await expect(page.locator('.page-layout > .container h1')).toHaveText('Radio Buttons page for Automation Testing Practice');
    // await expect()page.locator('.page-layout > .container .card > .card-header').first().toBeVisible();
    const cardHeader = await page.locator('.page-layout > .container .card > .card-header').first();
    await expect(cardHeader).toBeVisible();
    await expect(cardHeader).toHaveText('Select your favorite color:');
});

test('RadioButtons-tc02', async ({ page }) => {
    await page.goto('https://practice.expandtesting.com/radio-buttons');
    const blackRadioButton = page.locator('#black');
    await blackRadioButton.check();

    // await page.locator('[type="radio"]').filter({ hasText: 'black' }).check();
    // await page.locator('[type="radio"]').filter({ hasText: 'basketball' }).check();

    // await expect(page.locator('#black')).toBeChecked();
    // await expect(page.locator('#black')).toHaveValue('black');

    // await expect(page.locator('#basketball')).toBeChecked();
    // await expect(page.locator('#basketball')).toHaveValue('basketball');

    const basketballRadioButton = page.locator('#basketball');
    await basketballRadioButton.check();

    await expect(blackRadioButton).toBeChecked();
    await expect(blackRadioButton).toHaveValue('black');

    await expect(basketballRadioButton).toBeChecked();
    await expect(basketballRadioButton).toHaveValue('basketball');


});

const dataTest = {
    "age": {
        "valid": "41",
        "invalid": "0"
    },
    "height": {
        "valid": "183",
        "invalid": "-13"
    },
    "weight": {
        "valid": "80",
        "invalid": "-0"
    }

}

test('BMI-tc01', async ({ page }) => {
    await page.goto('https://practice.expandtesting.com/bmi');
    const pageTitle = page.locator('.page-title');
    await expect(pageTitle).toBeVisible();
    await expect(pageTitle).toContainText('BMI Calculator App for Automation Testing Practice');

    const selectElement = page.locator('.page-layout select');
    await expect(selectElement).toHaveCount(1);

    const inputElements = page.locator('.page-layout input');
    await expect(inputElements).toHaveCount(3);
});

test('BMI-tc02', async ({ page }) => { //genderselect
    await page.goto('https://practice.expandtesting.com/bmi');

    const selectElement = page.locator('.page-layout select');
    await expect(selectElement).toHaveCount(1);

    const genderLabel = page.locator('label').filter({ hasText: 'Gender' });
    await expect(genderLabel).toBeVisible();

    const genderSelect = page.locator('select');
    await genderSelect.selectOption({ label: 'Male' });
    await expect(genderSelect).toHaveValue('Male');
});


test('BMI-tc03', async ({ page }) => {//age
    await page.goto('https://practice.expandtesting.com/bmi');
    await expect(page.locator('label[for="age"]')).toHaveText('Age (ages: 2 - 120)');

    const ageInput = page.locator('#age');
    await ageInput.fill('');
    await ageInput.fill(dataTest.age.valid);
});

test('BMI-tc04', async ({ page }) => {//height
    await page.goto('https://practice.expandtesting.com/bmi');
    await expect(page.locator('label[for="height"]')).toHaveText('Height (cm)');

    const heightInput = page.locator('#height');
    await heightInput.fill('');
    await heightInput.fill(dataTest.height.valid);
});

test('BMI-tc05', async ({ page }) => {//weight
    await page.goto('https://practice.expandtesting.com/bmi');
    await expect(page.locator('label[for="weight"]')).toHaveText('Weight (kg)');

    const weightInput = page.locator('#weight');
    await weightInput.fill('');
    await weightInput.fill(dataTest.weight.valid);
});


test('BMI-tc06', async ({ page }) => {//val
    await page.goto('https://practice.expandtesting.com/bmi');
    bmiPage = new BmiPage(page);

    await bmiPage.selectGender('Male'); 
    await bmiPage.fillDetails(dataTest.age.valid, dataTest.height.valid, dataTest.weight.valid); 
    await bmiPage.Calculate();
    // await bmiPage.verifyInformation('Male', dataTest.age.valid, dataTest.height.valid, dataTest.weight.valid);
    await expect(page.getByRole('heading', { name: 'Report' })).toBeVisible();
    await expect(page.locator('b')).toHaveText('Male' + ', ' + dataTest.age.valid + ' (yr), ' + dataTest.height.valid + ' (cm), ' + dataTest.weight.valid + ' (kg)');
});


test('BMI-tc07', async ({ page }) => {//inage
    await page.goto('https://practice.expandtesting.com/bmi');
    bmiPage = new BmiPage(page);

    await bmiPage.selectGender('Male'); 
    await bmiPage.fillDetails(dataTest.age.invalid, dataTest.height.valid, dataTest.weight.valid); 
    await bmiPage.Calculate();
    // await bmiPage.verifyFailBMI()
    await expect(page.locator('.alert-box')).toHaveText('Please provide all the necessary information!×');
});

test('BMI-tc08', async ({ page }) => {//inheight
    await page.goto('https://practice.expandtesting.com/bmi');
    bmiPage = new BmiPage(page);

    await bmiPage.selectGender('Male'); 
    await bmiPage.fillDetails(dataTest.age.valid, dataTest.height.invalid, dataTest.weight.valid); 
    await bmiPage.Calculate();
    await expect(page.locator('.alert-box')).toHaveText('Please provide all the necessary information!×');
});

test('BMI-tc09', async ({ page }) => {//inweight
    await page.goto('https://practice.expandtesting.com/bmi');
    bmiPage = new BmiPage(page);

    await bmiPage.selectGender('Male'); 
    await bmiPage.fillDetails(dataTest.age.valid, dataTest.height.valid, dataTest.weight.invalid); 
    await bmiPage.Calculate();
    await expect(page.locator('.alert-box')).toHaveText('Please provide all the necessary information!×');
});




