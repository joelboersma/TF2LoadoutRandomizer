import json

fr = open("loadouts.json")
data = json.load(fr)
fr.close()

for tf2Class in data.get("classes", {}):
   print(tf2Class.get("name"))