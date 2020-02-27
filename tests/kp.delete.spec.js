let userPage = require('../pages/user.page.js');
var EC = protractor.ExpectedConditions;

describe('Delete last product in list',function(){

    let user = new userPage();

    beforeAll(async function(){
        await browser.get("https://www.kupujemprodajem.com/user.php?action=welcome");
    });

    it('Delete last product',async function(){
        let br=user.productfordelete();
        await browser.wait(EC.elementToBeClickable(user.deleteproduct.get(br)),3000);
        await user.deleteproduct.get(br).click();
        await browser.switchTo().frame(user.iframe.getWebElement());
        await browser.wait(EC.and(EC.elementToBeClickable(user.diffrentreason),EC.elementToBeClickable(user.delete)),3000);
        await user.diffrentreason.click();
        await browser.wait(EC.elementToBeSelected(user.diffrentreason),3000);
        await user.delete.click();
        expect(browser.getCurrentUrl()).toEqual("https://www.kupujemprodajem.com/user.php?action=welcome");
    });

});