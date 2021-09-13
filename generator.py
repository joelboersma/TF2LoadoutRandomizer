import json
import random

# Get data from loadouts.json
fr = open("loadouts.json")
data = json.load(fr)
fr.close()

# Have user choose class
print(
   "1. Scout\n" +
   "2. Soldier\n" +
   "3. Pyro\n" +
   "4. Demoman\n" +
   "5. Heavy\n" +
   "6. Engineer\n" +
   "7. Medic\n" +
   "8. Sniper\n" +
   "9. Spy\n" +
   "0. Random"
)
num = input("Enter the number for your desired class: ")
classIndex = 0
if num is 0:
   classIndex = random.randint(0, 8)
else:
   classIndex = num - 1

for tf2Class in data.get("classes", {}):
   print(tf2Class.get("name", ""))
   weapons = tf2Class.get("weapons", {})
   slots = weapons.keys()
   for slot in slots:
      print ("    " + slot)
      for weapon in weapons[slot]:
         print("        " + weapon)