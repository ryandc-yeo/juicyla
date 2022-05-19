import React from 'react';
import ReactDOMServer from "react-dom/server";
import GetMenu from './get_menu.js';

const now = new Date();
let periods = ['Breakfast','Lunch','Dinner','inv'];
let period = "";

if(now.getHours() < 11 && now.getHours() > 6) {
    period = periods[0];
} else if(now.getHours() < 15 && now.getHours() > 10) {
    period = periods[1];
} else if(now.getHours() < 21 && now.getHours() > 15) {
    period = periods[2];
} else {
    period = periods[3];
}

function generateData(data,period,restaurant) {

    var table = [period];

    var p_pattern = null;

    switch(period) {
        case 'Breakfast':
            p_pattern = /<h2 id=\\"page-header\\">Breakfast Menu(.*?)<h2/;
            break;
        case 'Lunch':
            p_pattern = /<h2 id=\\"page-header\\">Lunch Menu(.*?)<h2/;
            break;
        case 'Dinner':
            p_pattern = /<h2 id=\\"page-header\\">Dinner Menu(.*?)<hr class/;
            break;
    }

    if(p_pattern==null) {
        return 'inv_p';
    }

    const reg_period = p_pattern;

    let period_data = data.match(reg_period)[1]; // pd is now specifically the period you are in

    var r_pattern = null;

    switch(restaurant) {
        case 'Epicuria':
            r_pattern = /<h3 class=\\"col-header\\">Epicuria(.*?)<h3/;
            break;
        case 'De Neve':
            r_pattern = /<h3 class=\\"col-header\\">De Neve(.*?)<h3/;
            break;
        case 'Bruin Plate':
            r_pattern = /<h3 class=\\"col-header\\">Bruin Plate(.*?)/;
            break;
    }

    if(r_pattern==null) {
        return 'inv_r';
    }

    const reg_rest = r_pattern;

    let restaurant_data = period_data.match(reg_rest)[1];
    
    const r_sectGet = /<li class=\\"sect-item\\">([A-za-z\s]*)</g; // Get section names

    const r_itemGet = /<ul class=\\"item-list\\">[\\r\\n\s]*<li class=\\"menu-item\\">(.*?)<\/ul>/g; // Get section items
    const r_itemName = /<a class=\\"recipelink\\" href=\\".*?\\">(.*?)<\/a>/g; // Get names in items

    const r_itemDe = /<div class=\\"item-description-wrapper\\">(.*?)<\/div>/g; // Get descriptions in items part 1
    const r_itemText = /<div class=\\"tt-description\\">(.*?)<\/div>/; // Get descriptions in items part 2

    let sec_names = [...restaurant_data.matchAll(r_sectGet)];
    let processed_sec_names = [];

    let sec_cont = [...restaurant_data.matchAll(r_itemGet)];
    let processed_sec_cont = [];

    for(let i = 0; i < sec_names.length; i++) {
        let s = sec_names[i][1].replace(/\\r\\n/g,'');
        processed_sec_names.push(s.trim());
    }

    let sect_lens = [];

    for(let i = 0; i < sec_cont.length; i++) {

        let item_names = [...sec_cont[i][1].matchAll(r_itemName)];
        sect_lens.push([processed_sec_names[i],item_names.length]);
        
        let item_descripts = [...sec_cont[i][1].matchAll(r_itemDe)];

        for(let j = 0; j < item_names.length; j++) {

            let a = [];
            a[0] = item_names[j][1];

            if(item_descripts[j][0].match(r_itemText)!=null) {
                let d = item_descripts[j][0].match(r_itemText)[1].replace(/\\r\\n/g,'');
                a[1] = d.trim();
            }
            else {
                a[1] = "No description.";
            }

            processed_sec_cont.push(a);
        }
    }

    table.push(sect_lens);
    table.push(processed_sec_cont);
    
    var finTable = "";

    finTable += '<h1>' + table[0] + '</h1>';

    var numItem = 0;

    for(let i = 0; i < table[1].length; i++) {
        let current_sect = table[1][i][0]; // ex: Psistaria
        finTable += '<h2>' + current_sect + '</h2>';
        finTable += '<ul>';
        for(let j = 0; j < table[1][i][1]; j++) {
            finTable += '<li>' + table[2][numItem][0]+ '</li>';
            numItem++;
        }
        finTable += '</ul>';
    }

    return finTable;
}

export default function Menu(rest) {
    try {
        const menu_data = GetMenu();
        const d = generateData(menu_data,period,rest);
        return(d);
    } catch {
        console.log("Failed to get menu.");
    }
}