const axios = require('axios');
const fs = require('fs');

let rest = "Epicuria"; // temp for testing; should eventually get the restaurant from the page it's on!

const now = new Date();
let periods = ['Breakfast','Lunch','Dinner','inv'];
let period = "";

if(now.getHours() < 11 && now.getHours() > 6) {
    period = periods[0];
} else if(now.getHours() < 16 && now.getHours() > 10) {
    period = periods[1];
} else if(now.getHours() < 21 && now.getHours() > 16) {
    period = periods[2];
} else {
    period = periods[3];
}

async function request(period, restaurant) {
    const request = await axios.get('http://menu.dining.ucla.edu/Menus');
    return JSON.stringify(request.data);
}

function createTable(data) {
    
    const r1 = /<li class=\\"sect-item\\">([A-za-z\s]*)</g; // Get section names
    const r2 = /\s*([A-Za-z]*\s*[A-Za-z]*)\s*/; // Process section names

    const r3 = /<ul class=\\"item-list\\">[\\r\\n\s]*<li class=\\"menu-item\\">(.*?)<\/ul>/g; // Get section items
    const r4 = /<a class=\\"recipelink\\" href=\\".*?\\">(.*?)<\/a>/g; // Get names in items

    const r5 = /<div class=\\"item-description-wrapper\\">(.*?)<\/div>/g; // Get descriptions in items part 1
    const r6 = /<div class=\\"tt-description\\">(.*?)<\/div>/; // Get descriptions in items part 2

    let sec_names = [...data.matchAll(r1)];
    let psn = [];

    let sec_cont = [...data.matchAll(r3)];
    let psc = [];

    for(let i = 0; i < sec_names.length; i++) {
        let s = sec_names[i][1].replace(/\\r\\n/g,'');
        psn.push(s.trim());
    }

    var k = 0;

    for(let i = 0; i < sec_cont.length; i++) {
        let a = [];
        let item_names = [...sec_cont[i][1].matchAll(r4)];
        let item_descripts = [...sec_cont[i][1].matchAll(r5)];
        for(let j = 0; j < item_names.length; j++) {
            a[0] = item_names[j][1];
            if(item_descripts[j][0].match(r6)!=null) {
                let d = item_descripts[j][0].match(r6)[1].replace(/\\r\\n/g,'');
                a[1] = d.trim();
            }
            else {
                a[1] = "No description.";
            }
        }
        psc.push(a);
    }

    return psc;
}

request("Dinner",rest).then(re => {
    let z = createTable(re);
});



/*
split into periods -> restaurants -> sections -> individual menu items

depending on page:
find the restaurant; remove all else
check time against meal period; find the meal period in variable; remove all else
pattern for section names -> <li class="sect-item">([A-za-z\s]*)<
pattern for individual items -> <a class="recipelink" href="[A-za-z:\/.0-9]*">([A-za-z\s]*)<

returns table -> display that
then display with css or whatever... idk
*/