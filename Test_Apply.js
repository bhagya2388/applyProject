require("chromedriver");
const {Browser, Builder, By, until} = require("selenium-webdriver");

const assert = require("chai").assert;

describe("Staff Logic Apply to QA Engineer",()=>{
    const driver = new Builder()
        .forBrowser("chrome")
        .build();

    before(async function() {
           await driver.get("https://staffbase.com/jobs/quality-assurance-engineer-2021_1730");
            driver.sleep(20)
            driver.wait(until.elementIsVisible(await driver.findElement(By.id('onetrust-accept-btn-handler'))),60000);
            driver.sleep(20)
            await driver.findElement(By.id('onetrust-accept-btn-handler')).click();
            assert.doesNotThrow(() => {
                driver.findElement(By.xpath("//a[text()='Apply']"))
            })
    });

    after(async ()=> {
        driver.quit()
    })

    it('Click Apply adn Submit Form', async ()=> {
        await driver.findElement(By.xpath("//a[text()='Apply'][1]")).click();
        driver.wait(until.elementIsVisible(await driver.findElement(By.id('first_name'))),60000);
        assert.doesNotThrow(() => {
            driver.findElement(By.id('first_name'))
        })
    });

    it('Submit Form ', async ()=> {
        let firstName = "bhagyashree"
        driver.wait(until.elementIsVisible(await driver.findElement(By.id('first_name'))),60000);
        await driver.findElement(By.id('first_name')).click();
        await driver.findElement(By.id('first_name')).sendKeys(firstName);
        assert.equal((driver.findElement(By.id('first_name')).getAttribute("value")), firstName)

        let lastName = "Rathore"
        driver.wait(until.elementIsVisible(await driver.findElement(By.id('last_name'))),60000);
        await driver.findElement(By.id('last_name')).click();
        await driver.findElement(By.id('last_name')).sendKeys(lastName);
        assert.equal((driver.findElement(By.id('last_name')).getAttribute("value")), lastName)

        let email = "bhagya.s.rathore2388@gmail.com"
        driver.wait(until.elementIsVisible(await driver.findElement(By.id('email'))),60000);
        await driver.findElement(By.id('email')).click();
        await driver.findElement(By.id('email')).sendKeys(email);
        assert.equal((driver.findElement(By.id('email')).getAttribute("value")), lastName)

        driver.wait(until.elementIsEnabled(await driver.findElement(By.id('phone'))),60000);
        await driver.findElement(By.id('phone')).click();
        await driver.findElement(By.id('phone')).sendKeys("+91 8411867644");

        //Attach resume
        await driver.findElement(By.xpath('//*[@id="resume_fieldset"]/div/div[3]/button[1]')).click();
        const resume_path = path.join(__dirname, '../data/bhagyashreeResume.pdf')
        const remotepath = browser.upload(resume_path)

        const resumeDiv = $('/*[@id="s3_upload_for_resume"]/input[9]');
        browser.execute(function(){
            (document.evaluate('//*[@id="s3_upload_for_resume"]/input[9]',
                document, null,
                XPathResult.FIRST_ORDERED_NODE_TYPE, null)
                .singleNodeValue)
                .style
                .display = "block"
        })
        resumeDiv.waitForDisplayed();
        resumeDiv.setValue(remotepath)

        //Attach cover letter
        await driver.findElement(By.xpath('//*[@id="resume_fieldset"]/div/div[3]/button[1]')).click();
        const cover_path = path.join(__dirname, '../data/bhagyashreeCoverLetter.pdf')
        const cover_remote_path = browser.upload(cover_path)
        const inputDiv = $('/*[@id="s3_upload_for_cover_letter"]/input[9]');
        browser.execute(function(){
            (document.evaluate('//*[@id="s3_upload_for_resume"]/input[9]',
                document, null,
                XPathResult.FIRST_ORDERED_NODE_TYPE, null)
                .singleNodeValue)
                .style
                .display = "block"
        })
        inputDiv.waitForDisplayed();
        inputDiv.setValue(cover_remote_path)

        //check visa status
        let visa_status = "Hold Family reunion visa. Require work permit"
        driver.wait(until.elementIsEnabled(await driver.findElement(By.id('job_application_answers_attributes_0_text_value'))),60000);
        await driver.findElement(By.id('job_application_answers_attributes_0_text_value')).click();
        await driver.findElement(By.id('job_application_answers_attributes_0_text_value'))
            .sendKeys(visa_status);
        assert.equal((driver.findElement(By.id('job_application_answers_attributes_0_text_value')).getAttribute("value")), visa_status)

        //Privacy conditions
        driver.wait(until.elementIsEnabled(await driver.findElement(By.id('select2-chosen-1'))),60000);
        await driver.findElement(By.css('#elect2-chosen-1 > option[value=yes]')).click();

        //githublink
        let gitlink = "https://github.com/bhagya2388/applyProject.git"
        driver.wait(until.elementIsEnabled(await driver.findElement(
            By.id('job_application_answers_attributes_2_text_value')))
            ,60000);


        await driver.findElement(By.id('job_application_answers_attributes_2_text_value')).click();
        await driver.findElement(By.id('job_application_answers_attributes_2_text_value'))
            .sendKeys(gitlink);
        assert.equal((driver.findElement(By.id('job_application_answers_attributes_2_text_value'))
                .getAttribute("value")), gitlink)

        driver.wait(until.elementIsEnabled(await driver.findElement(By.id('submit_app'))),60000);
        await driver.findElement(By.id('submit_app')).click();

        //Validate successful submission
        assert.doesNotThrow(driver.findElement(By.id('application_confirmation')))

    })
});
