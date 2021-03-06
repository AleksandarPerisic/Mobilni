let homePage = require('../pages/home.page.js');
let singinPage = require('../pages/singin.page.js');
var EC = protractor.ExpectedConditions;

describe('Login test',function(){

    let singin = new singinPage();
    let home = new homePage();
    
    beforeAll(async function(){
        await browser.get("https://www.kupujemprodajem.com");
        await browser.sleep(3000);
    });

    it('Verify that right page is opened',async function(){
        expect(await browser.getCurrentUrl()).toEqual("https://www.kupujemprodajem.com/");
    });

    it('Verify that sing in button works',async function(){
        await home.login.click();
        expect(await browser.getCurrentUrl()).toEqual("https://www.kupujemprodajem.com/user.php?action=welcome");
    }); 

    it('Veryfy that sing in user can log in',async function(){
        await singin.enterEmailandPassword();
        await singin.submit.click();
        await browser.sleep(1000);
        expect(await browser.getCurrentUrl()).toEqual("https://www.kupujemprodajem.com/user.php?action=welcome");
    });
    
});