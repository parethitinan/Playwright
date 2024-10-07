class BmiPage {
    constructor(page) {
        this.page = page;
        this.ageInput = page.locator('#age');
        this.heightInput = page.locator('#height');
        this.weightInput = page.locator('#weight');
        this.genderSelect = page.locator('select');
        this.calculateButton = page.locator('.btn-primary');
        this.report = page.getByRole('heading');
        this.reportInfo = page.locator('b');
        this.alertBox = page.locator('.alert-box');
    }

    async fillDetails(age, height, weight) {
        await this.ageInput.fill(age);
        await this.heightInput.fill(height);
        await this.weightInput.fill(weight);
    }

    async selectGender(gender) {
        await this.genderSelect.selectOption({ label: gender });
    }

    async Calculate() {
        await this.calculateButton.click();
    }

    async verifyReport() {
        await expect(this.report).toHaveText('Report');
    }

    async verifyInformation(gender, age, height, weight) {
        // await expect(this.reportInfo).toHaveText(`${gender}, ${age} (yr), ${height} (cm), ${weight} (kg)`);
        await expect(page.locator('b')).toHaveText(`${gender}` + ', ' + `${age}` + ' (yr), ' + `${height}` + ' (cm), ' + `${weight}` +  '(kg)');
    }

    async verifyFailBMI() {
        await expect(this.alertBox).toHaveText('Please provide all the necessary information!×');
    }
}

module.exports = { BmiPage };
