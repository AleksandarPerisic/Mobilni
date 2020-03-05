let userPage=function(){
    var EC = protractor.ExpectedConditions;
    let adPage = require('../pages/ad.page.js');
    let ad = new adPage();

    this.product=element(by.css('div[class="adListContainer userAds"]')).all(by.css('a[class="adName"]'));
    this.productholder=element(by.css('div[id="oglas-holder"]'));
    this.deleteproduct=element(by.css('div[id="adTable"]')).all(by.css('a[rel1="lyteframe"]'));
    this.newproduct=element(by.css('a[class="bigLink submitAd"]'));
    this.numberofproducts=element(by.css('a[class="link-tab active-link-tab"]'));
    this.iframe=element(by.css('iframe[class="kpBoxIframe"]'));
    this.diffrentreason=element(by.css('input[id="data[reason]other"]'));
    this.delete=element(by.css('input[name="submit[delete]"]'));

    this.switchToSecondTab = async (br) => {
        let windows = await browser.getAllWindowHandles();
        await browser.switchTo().window(windows[br]);
    };

    this.closeSecondTab = async () => {
        let windows = await browser.getAllWindowHandles();
        await browser.close();
    };

    this.switchToFirstTab = async (br) => {
        let windows = await browser.getAllWindowHandles();
        await browser.switchTo().window(windows[br]);
    };

    this.productforopening = async (testdata,id,br) =>{
        for(let i=0;i<testdata.product.length;i++){
            if(id==testdata.product[i].id){
                //return testdata.product[i].name;
                await this.openproduct(testdata.product[i].name,br);
            }
        }
    };

    this.openproduct = async (name,br) =>{
        for(let i=0;i<await this.product.count();i++){
            if(name == await this.product.get(i).getText()){
                var scrolldown = this.product.get(i);
                await browser.controlFlow().execute(function() {
                     browser.executeScript('arguments[0].scrollIntoView(true)', scrolldown.getWebElement());
                });
                await browser.actions().keyDown(protractor.Key.COMMAND).perform();
                await this.product.get(i).click();
                await this.switchToSecondTab(br);
                await browser.wait(EC.visibilityOf(ad.adtitle),3000);
            }
        }
    }

    this.productfordelete = async () => {
        let text = await this.product.get(0).getText();
        for(let i=1;i<await this.product.count();i++)
        {
            if(text==await this.product.get(i).getText())
            {
                return i;
            }
        }
    };
}

module.exports = userPage;