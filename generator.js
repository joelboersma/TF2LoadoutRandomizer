'use strict';

let data;

// Get data from loadouts.json
function getLoadouts(callback) {
   var xobj = new XMLHttpRequest();
   xobj.onreadystatechange = function() {
      if (xobj.readyState == 4 && xobj.status == "200") {
         callback(xobj.responseText);
      }
   };
   xobj.open('GET', 'loadouts.json', true);
   xobj.send();
}

// Console.log all the info, formatted
function consoleLogAll() {
   for (const tf2Class of data.classes) {
      console.log(tf2Class.name);
      const weapons = tf2Class.weapons
      for (const slot in weapons) {
         console.log(" - " + slot);
         for (const weapon of weapons[slot]) {
            console.log("    - " + weapon);
         }
      }
   }
}

// Generate loadout object
function generateLoadout(classIndex) {
   let loadout = {
      name: data.classes[classIndex].name,
      weapons: {}
   }

   for (const slot in data.classes[classIndex].weapons) {
      const weaponChoices = data.classes[classIndex].weapons[slot];
      const weaponSelection = weaponChoices[Math.floor(Math.random() * (weaponChoices.length - 1))];
      loadout.weapons[slot] = weaponSelection;
   }

   return loadout;
}

// Get loadout data
getLoadouts((response) => {
   data = JSON.parse(response);
   // consoleLogAll();
});

// Listen for keypress
document.addEventListener('keydown', (ev) => {
   let classIndex;
   if (ev.key == '0' || ev.key == ' ' || ev.key == 'Enter') {
      // Pick random class
      classIndex = Math.floor(Math.random() * data.classes.length);
   }
   else if (ev.key >= '1' && ev.key <= '9') {
      // If user pushes a number key, pick class corresponding to key pressed
      classIndex = ev.key - '1';
   }
   else return;

   console.log(`Your class: ${data.classes[classIndex].name} (${classIndex + 1})`);

   const loadout = generateLoadout(classIndex);
   console.log(loadout);
});