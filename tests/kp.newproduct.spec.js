let userPage = require('../pages/user.page.js');
let adPage = require('../pages/ad.page.js');
var remote = require('../node_modules/selenium-webdriver/remote');
var data = require('../Modeli.json');
var EC = protractor.ExpectedConditions;

describe('New product add test',function(){

    let user = new userPage();
    let ad = new adPage();
    var title="";
    var item_state="";
    var id=10;

    it('Veryfy that last product is opened in new tab',async function(){
        let name = await user.productforopening(data,id);
        await user.openproduct(name);
        await user.switchToSecondTab();
        await browser.wait(EC.visibilityOf(ad.adtitle),3000);
        title=await ad.adtitle.getText();
        expect(await user.productholder.getAttribute('class')).toEqual("oglas-holder");
    });

    it('Veryfy that page for new product is opened form home page', async function(){
        await user.switchToFirstTab();
        await browser.actions().keyUp(protractor.Key.COMMAND).perform();
        await user.newproduct.click();
        expect(await browser.getCurrentUrl()).toEqual("https://www.kupujemprodajem.com/oglasi.php?action=new");

    });

    it('Veryfy that category of new product is chosen', async function(){
        let choise= await ad.fchoice(title)
        await browser.wait(EC.visibilityOf(choise),3000);
        await choise.click();
        await browser.wait(EC.visibilityOf(ad.pchoice.first()),3000);
        expect(await ad.pchoice.first().getText()).toEqual('Izmenite');
    });

    it('Veryfy that title,price and text in second tab is copied in the new one', async function(){
        await user.switchToSecondTab();
        let cena= await ad.adprice.getText();
        let text = await ad.adtext.getText();
        item_state = await ad.adstate.getText();
        await user.closeSecondTab();
        await user.switchToFirstTab();
        await ad.name.sendKeys(title);
        await ad.price.sendKeys(ad.fprice(cena));
        await browser.switchTo().frame(ad.text.getWebElement());
        await ad.textbody.sendKeys(text);
        expect(await ad.textbody.getText()).toEqual(text);
    });

    it('Veryfy that condition and currency are set in the new one', async function(){
        await browser.switchTo().defaultContent()
        await ad.fstate(item_state);
        await ad.currencyeur.click();
        await browser.wait(EC.elementToBeSelected(ad.currencyeur),3000);
        expect(await ad.currencyeur.isSelected()).toEqual(true);
    });

    it('Veryfy that pictures are uploaded', async function(){
        jasmine.getEnv().defaultTimeoutInterval = 50000;
        await browser.setFileDetector(new remote.FileDetector());
        await ad.upload(title);
        await browser.wait(EC.presenceOf(ad.lastimg), 40000);
        expect(await ad.lastimg.isPresent()).toBe(true);
    });

    it('Veryfy that standard view is selected', async function(){
        await ad.submit.get(1).click();
        await browser.wait(EC.elementToBeClickable(ad.standardview),3000);
        await ad.standardview.click();
        expect(await ad.standardview.isSelected()).toBe(true);
    });

    it('Veryfy that acceptance criteria is selected', async function(){
        await ad.submit.get(3).click();
        await browser.wait(EC.and(EC.elementToBeClickable(ad.swearyes),EC.elementToBeClickable(ad.acceptyes)),3000);
        await browser.sleep(3000);
        await ad.swearyes.click();
        await ad.acceptyes.click();
        expect(await ad.acceptyes.isSelected()).toBe(true);
    });

    it('Veryfy that product is uploaded', async function(){
        await ad.submit.get(5).click();
        await browser.wait(EC.visibilityOf(ad.bodyfinish),10000);
        expect(await ad.bodyfinish.isDisplayed()).toBe(true);
    });
});