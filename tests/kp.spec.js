let userPage = require('../pages/user.page.js');
let adPage = require('../pages/ad.page.js');
var remote = require('selenium-webdriver/remote');
var data = require('../Modeli.json');
var EC = protractor.ExpectedConditions;

describe('New product add test',function(){

    let user = new userPage();
    let ad = new adPage();
    var title="";
    var item_state="";
    var id=0;

    it('Veryfy that last product is opened in new tab',async function(){
        for(let i=0;i<17;i++)
        {
        let i1=i+1;
        console.log(i);
        console.log(id);
        await browser.get("https://www.kupujemprodajem.com/user.php?action=welcome");
        await user.productforopening(data,id,i1);
        title=await ad.adtitle.getText();
        cena= await ad.adprice.getText();
        text = await ad.adtext.getText();
        item_state = await ad.adstate.getText();
        //
        await user.switchToFirstTab(i);
        await browser.actions().keyUp(protractor.Key.COMMAND).perform();
        await user.newproduct.click();
        //
        let choise= await ad.fchoice(title)
        await browser.wait(EC.visibilityOf(choise),3000);
        await choise.click();
        await browser.wait(EC.visibilityOf(ad.pchoice.first()),3000);
        //
        await ad.name.sendKeys(title);
        await ad.price.sendKeys(ad.fprice(cena));
        await browser.switchTo().frame(ad.text.getWebElement());
        await ad.textbody.sendKeys(text);
        //
        await browser.switchTo().defaultContent()
        await ad.fstate(item_state);
        await ad.currencyeur.click();
        await browser.wait(EC.elementToBeSelected(ad.currencyeur),3000);
        //
        jasmine.getEnv().defaultTimeoutInterval = 500000;
        await browser.setFileDetector(new remote.FileDetector());
        await ad.upload(title);
        await browser.wait(EC.presenceOf(ad.lastimg), 400000);
        //
        await ad.submit.get(1).click();
        await browser.wait(EC.elementToBeClickable(ad.standardview),3000);
        await ad.standardview.click();
        //
        await ad.submit.get(3).click();
        await browser.wait(EC.and(EC.elementToBeClickable(ad.swearyes),EC.elementToBeClickable(ad.acceptyes)),3000);
        await browser.sleep(3000);
        await ad.swearyes.click();
        await ad.acceptyes.click();
        //
        await ad.submit.get(5).click();
        await browser.wait(EC.visibilityOf(ad.bodyfinish),10000);
        //
        await browser.sleep(1000);
        await browser.get("https://www.kupujemprodajem.com/user.php?action=welcome");
        await browser.sleep(1000);
        let br=user.productfordelete();
        var scrolldown = user.product.get(br);
        await browser.controlFlow().execute(function() {
            browser.executeScript('arguments[0].scrollIntoView(true)', scrolldown.getWebElement());
        });
        await browser.wait(EC.elementToBeClickable(user.deleteproduct.get(br)),3000);
        await user.deleteproduct.get(br).click();
        await browser.switchTo().frame(user.iframe.getWebElement());
        await browser.wait(EC.and(EC.elementToBeClickable(user.diffrentreason),EC.elementToBeClickable(user.delete)),3000);
        await user.diffrentreason.click();
        await browser.wait(EC.elementToBeSelected(user.diffrentreason),3000);
        await user.delete.click();
        id=id+1;
        //ako bih zatvorio prvi da li bi se automacki prebacio na drugi tab
        await user.switchToSecondTab(i1);
    }
    });

});