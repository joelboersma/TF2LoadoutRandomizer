import json

fr = open("loadouts.json")
data = json.load(fr)
fr.close()

for tf2Class in data.get("classes", {}):
   print(tf2Class.get("name", ""))
   weapons = tf2Class.get("weapons", {})
   slots = weapons.keys()
   for slot in slots:
      print ("    " + slot)
      for weapon in weapons[slot]:
         print("        " + weapon)