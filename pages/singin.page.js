let singinPage=function(){
    this.email=element.all(by.css('td[align="left"]')).all(by.css('input[type="text"]')).first();
    this.password=element.all(by.css('td[align="left"]')).all(by.css('input[type="password"]')).first();
    this.submit=element.all(by.css('td[align="center"]')).all(by.css('input[type="submit"]')).first();

    this.enterEmailandPassword = async () => {
        await this.email.sendKeys(browser.params.login.user);
        await this.password.sendKeys(browser.params.login.password);
    }

}


module.exports = singinPage;