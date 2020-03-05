let userPage=function(){
    this.product=element(by.css('div[class="adListContainer userAds"]')).all(by.css('a[class="adName"]'));
    this.productholder=element(by.css('div[id="oglas-holder"]'));
    this.deleteproduct=element(by.css('div[id="adTable"]')).all(by.css('a[rel1="lyteframe"]'));
    this.newproduct=element(by.css('a[class="bigLink submitAd"]'));
    this.numberofproducts=element(by.css('a[class="link-tab active-link-tab"]'));
    this.iframe=element(by.css('iframe[class="kpBoxIframe"]'));
    this.diffrentreason=element(by.css('input[id="data[reason]other"]'));
    this.delete=element(by.css('input[name="submit[delete]"]'));

    this.switchToSecondTab = async () => {
        let windows = await browser.getAllWindowHandles();
        await browser.switchTo().window(windows[1]);
    };

    this.closeSecondTab = async () => {
        let windows = await browser.getAllWindowHandles();
        await browser.close();
    };

    this.switchToFirstTab = async () => {
        let windows = await browser.getAllWindowHandles();
        await browser.switchTo().window(windows[0]);
    };

    this.productforopening = async (testdata,id) =>{
        for(let i=0;i<testdata.product.length;i++){
            if(id==testdata.product[i].id){
                return testdata.product[i].name;
            }
        }
    };

    this.openproduct = async (name) =>{
        for(let i=0;i<await this.product.count();i++){
            if(name == await this.product.get(i).getText()){
                var scrolldown = this.product.get(i);
                await browser.controlFlow().execute(function() {
                     browser.executeScript('arguments[0].scrollIntoView(true)', scrolldown.getWebElement());
                });
                await browser.actions().keyDown(protractor.Key.CONTROL).perform();
                await this.product.get(i).click();
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