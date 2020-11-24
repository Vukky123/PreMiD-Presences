const presence = new Presence({
    clientId: '780884619225464844',
    mediaKeys: false,
});
const browsingStamp = Math.floor(Date.now() / 1000);

presence.on('UpdateData', async () => {
    const presenceData = {
        largeImageKey: 'salad',
        startTimestamp: browsingStamp,
    };
    if (document.location.hostname == "salad.io") {
        if (document.location.pathname == '/download') {
            presenceData.details = 'Downloading Salad'
        } 
    } else if (document.location.hostname == 'app.salad.io') {
        if (document.location.pathname == "/login") {
            presenceData.details = "Logging in"
        } else if (document.location.pathname == "/account/summary") {
            presenceData.details = "Viewing account settings"
        } else if (document.location.pathname == "/account/referrals" || document.location.pathname == "/earn/referrals") {
            presenceData.details = "Viewing referrals"
        } else if (document.location.pathname == "/account/reward-vault") {
            presenceData.details = "Viewing reward vault"
        } else if (document.location.pathname == "/search") {
            presenceData.details = "Searching the store"
        } else if (document.location.pathname == "/earn/offerwall") {
            presenceData.details = "Viewing offerwall information"
        } else if (document.location.pathname.startsWith("/earn/offerwall/")) {
            if (document.location.pathname == "/earn/offerwall/adgem") {
                presenceData.details = "Viewing an offerwall"
                presenceData.state = "AdGem"
            } else if (document.location.pathname == "/earn/offerwall/offer-toro") {
                presenceData.details = "Viewing an offerwall"
                presenceData.state = "OfferToro"
            }
        } else if (document.location.pathname.startsWith("/rewards/")) {
            if(!document.getElementsByClassName("c0130")[0]) return;
            presenceData.details = "Viewing a reward"
            presenceData.state = document.getElementsByClassName("c0130")[0].textContent
        } else if (document.location.pathname == "/salad-pay/order-summary") {
            presenceData.details = "Buying a reward"
        } else if (document.location.pathname == "/earn/summary") {
            if(!document.getElementsByClassName("c0176")[0]) return;
            presenceData.details = "Viewing earning summary"
            presenceData.state = `Balance: ${document.getElementsByClassName("c0176")[0].textContent}`
        }
    } else if (document.location.hostname == "getsalad.io") {
        presenceData.details = 'Downloading Salad'
    }
    presence.setActivity(presenceData);
});