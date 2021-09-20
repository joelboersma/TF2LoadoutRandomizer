'use strict';

// === GLOBAL VARS ===
const generateButton = document.getElementById('generateButton');
const resultsDiv = document.getElementById('results');
const classHeader = document.querySelector('#results h2');
const weaponList = document.querySelector('#results ul');
let data;


// === HELPER FUNCTIONS ===

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
      className: data.classes[classIndex].name,
      weapons: {}
   }

   for (const slot in data.classes[classIndex].weapons) {
      const weaponChoices = data.classes[classIndex].weapons[slot];
      const weaponSelection = weaponChoices[Math.floor(Math.random() * (weaponChoices.length - 1))];
      loadout.weapons[slot] = weaponSelection;
   }

   return loadout;
}

// Display the loadout given a loadout object
function displayLoadout(loadout) {
   classHeader.innerHTML = `Class: ${loadout.className}`;
   weaponList.innerHTML = '';
   for (const slot in loadout.weapons) {
      weaponList.innerHTML += `<li>${slot}: ${loadout.weapons[slot]}</li>`
   }
   resultsDiv.hidden = false;
}

// Calculate then display loadout when button is pushed, with given class
function loadoutAction(classIndex) {
   const loadout = generateLoadout(classIndex);
   displayLoadout(loadout);
}


// === RUN ON STARTUP ===

// Get loadout data
getLoadouts((response) => {
   data = JSON.parse(response);
   // consoleLogAll();

   // Now that we have the data, add the button/keyboard event listeners

   // Listen for randomize button push
   generateButton.addEventListener('click', () => {
      const classIndex = Math.floor(Math.random() * data.classes.length);
      loadoutAction(classIndex);
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

      loadoutAction(classIndex);
   });
});
