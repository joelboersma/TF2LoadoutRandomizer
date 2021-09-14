'use strict';

let data;

function getLoadouts(callback) {
   var xobj = new XMLHttpRequest();
   xobj.overrideMimeType("application/json");
   xobj.open('GET', 'loadouts.json', true);
   xobj.onreadystatechange = function () {
      if (xobj.readyState == 4 && xobj.status == "200") {
         // Required use of an anonymous callback as .open will NOT return a value but simply returns undefined in asynchronous mode
         callback(xobj.responseText);
      }
   };
   xobj.send(null);
}

function consoleLogAll() {
   for (const tf2Class of data.classes) {
      console.log(tf2Class.name)
      const weapons = tf2Class.weapons
      for (const slot in weapons) {
         console.log(" - " + slot)
         for (const weapon of weapons[slot]) {
            console.log("    - " + weapon)
         }
      }
   }
}

getLoadouts((response) => {
   data = JSON.parse(response);
   consoleLogAll();
});

document.addEventListener('keydown', (ev) => {
   let tf2ClassIndex;
   if (ev.key == '0') {
      tf2ClassIndex = Math.floor(Math.random() * data.classes.length);
   }
   else if (ev.key >= '1' && ev.key <= '9') {
      tf2ClassIndex = ev.key - '1';
   }
   else {
      return;
   }
   console.log(`Your class: ${data.classes[tf2ClassIndex].name} (${tf2ClassIndex + 1})`)
});