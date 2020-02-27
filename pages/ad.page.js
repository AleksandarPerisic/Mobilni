let adPage=function(){

    this.choicemobi=element(by.css('label[group-name="Kineski telefoni"]'));
    this.choicedet=element(by.css('label[group-name="Metal detektori"]'));
    this.name=element(by.css('input[id="data[name]"]'));
    this.condition_new=element(by.css('input[id="data[condition]as-new"]'));
    this.condition_used=element(by.css('input[id="data[condition]used"]'));
    this.price=element(by.css('input[id="price_number"]'));
    this.currencyeur=element(by.css('input[id="currency_eur"]'));
    this.currencyrsd=element(by.css('input[id="currency_rsd"]'));
    this.text=element(by.css('iframe[id="data[description]_ifr"]'));
    this.textbody=element(by.css('body[id="tinymce"]'));
    this.picture=element(by.css('input[id="upload_file"]'));
    this.submit=element.all(by.css('div[class="prev-next-step-holder form-field"]')).all(by.css('input[class="submit-button"]'));
    this.standardview=element.all(by.css('input[type="checkbox"]')).get(7);
    this.swearyes=element(by.css('input[id="swear_yes"]'));
    this.acceptyes=element(by.css('input[id="accept_yes"]'));
    this.pchoice=element.all(by.css('a[class="underline"]'));
    this.adtitle=element(by.css('h1[class="oglas-title"]'));
    this.adprice=element(by.css('div[class="price-holder"]'));
    this.adstate=element(by.css('div[class="oglas-condition"]'));
    this.adtext=element(by.css('div[class="oglas-description"]'));
    this.lastimg=element(by.css('input[value="10.jpg"]'));
    this.bodyfinish=element(by.css('div[id="middleCol"]'));

    this.upload = async (naslov)  => {
        let file='/Users/a.perisic/Desktop/KupujemProdajem/Mobiles/';
        file=file+naslov+"/";
        for(let i=1;i<11;i++){
            let absolutePath=file+i.toString()+".jpg";
            await this.picture.sendKeys(absolutePath);
            console.log(absolutePath);
        }
    }

    this.fprice = async (element) =>{
        let vcena = ""
        for(let i=6;i<10;i++){	
            if(element.charAt(i)==",") break;
            vcena=vcena + element.charAt(i);
        }
        return vcena;
    }

    this.fchoice = async (element) =>{
        let x=await element.includes("Metal");
        if(x==true) return await this.choicedet;
        else return await this.choicemobi;
    }

    this.fstate = async (element) => {
        if(element == "(Kao novo - nekorišćeno)")
            await this.condition_new.click();
        else 
            await this.condition_used.click();
    }
}

module.exports = adPage;