import fs from 'fs';
import axios from 'axios';

const now = new Date();
const d = now.toString();

fs.access('./menu.txt', fs.constants.F_OK, (err) => {
    if(err) {
        request_menu();
    }
    else {
        const menu_data = fs.readFileSync('./menu.txt', 'UTF-8');
        const line = menu_data.split(/\r?\n/)[0];

        if(line !== d.slice(0,15)) {
            request_menu();
        }
    }
});

async function request() {
    const request = await axios.get('http://menu.dining.ucla.edu/Menus');
    return JSON.stringify(request.data);
}

function request_menu() {
    request().then(re => {
        let dateString = d.slice(0,15) + '\n';
        fs.writeFile('./menu.txt',dateString, function (err) {
            if(err) console.log("Error saving file.");
        });
        fs.appendFile('./menu.txt',re,function(err) {
            if(err) console.log("Error saving file.");
        });
    })
}

export default function GetMenu(){}