const presence = new Presence({
    clientId: '687312335895134245',
    mediaKeys: false,
});
const browsingStamp = Math.floor(Date.now() / 1000);

let map = { id : 0 };
let fish = 0;
let skellies = 0;

presence.on('UpdateData', async () => {
    const presenceData = {
        largeImageKey: 'void',
        startTimestamp: browsingStamp,
    };
    if (document.location.pathname == '/game') {
        presenceData.details = 'In-game.';
        presenceData.state = `Map: ${map.id}\nFish: ${fish}\nSkellies: ${skellies}`;
    }
    else if (document.location.pathname == '/login') {
        presenceData.details = 'Logging in';
    }
    else if (document.location.pathname == '/register') {
        presenceData.details = 'Creating an account';
    }
    else if (document.location.pathname == '/') {
        presenceData.details = 'On the homepage';
    }
    presence.setActivity(presenceData);
});

async function updateMap() {
    const r = await fetch('https://rpvoid.com/map', {
        'credentials': 'include',
        'headers': {
            'accept': 'application/json, text/plain, */*',
            'content-type': 'application/json;charset=UTF-8',
            'x-xsrf-token': decodeURIComponent(document.cookie).replace('XSRF-TOKEN=', ''),
        },
        'body': null,
        'method': 'GET',
    });
    map = await r.json();
}
async function updateInventory() {
    const r = await fetch('https://rpvoid.com/inventory?type=materials', {
        'credentials': 'include',
        'headers': {
            'accept': 'application/json, text/plain, */*',
            'content-type': 'application/json;charset=UTF-8',
            'x-xsrf-token': decodeURIComponent(document.cookie).replace('XSRF-TOKEN=', ''),
        },
        'body': null,
        'method': 'GET',
    });
    const bag = await r.json();
    fish = getItemAmount(bag, 2);
    skellies = getItemAmount(bag, 26);
}

if (document.location.pathname == '/game') {
  updateMap();
  updateInventory();

  // update every 120 seconds
  setInterval(() => {
      updateMap();
      updateInventory();
  }, 120 * 1000);
}

function getItemAmount(bag, id) {
    for (let i = 0; i < bag.length; i++) {
        const item = bag[i];
        if (item.id === id) {
            return item.amount;
        }
    }
    return 0;
}
