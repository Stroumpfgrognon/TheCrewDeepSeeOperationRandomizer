import random as rd
import re
import sys

replace_color = False

if len(sys.argv) < 3:
    nbPlayers = 3
    missionLevel = 10
else :
    nbPlayers = int(sys.argv[1])
    missionLevel = int(sys.argv[2])
    if nbPlayers < 3 or nbPlayers > 5:
        print("Number of players must be between 3 and 5")
        sys.exit(1)

if len(sys.argv) >=4:
    replace_color = bool(int(sys.argv[3]))

class Mission:
    def __init__(self, level: str):
        match = re.match(r"\((\d)/(\d)/(\d)\) (.+)", level)
        if match:
            self.levels = [int(match.group(1)), int(match.group(2)), int(match.group(3))]
            if replace_color : self.description = match.group(4).replace("green","club ♣").replace("blue","spade ♠").replace("pink","heart ♥").replace("yellow","diamond ♦").replace("submarines","[ faces 🃛🂭🂾 or jokers 🂿 ]").replace("submarine","[ face 🃛🂭🂾 or joker 🂿 ]")
            else : self.description = match.group(4)
        else:
            self.levels = []
            self.description = ""
    def getLevel(self) -> int:
        return self.levels[nbPlayers - 3]
    def getDescription(self) -> str:
        return self.description

mission_object = []
with open("bin/missions.txt", "r", encoding="utf-8") as file:
    missions = file.readlines()
    mission_objects = [Mission(mission) for mission in missions]
with open("bin/custom_missions.txt", "r", encoding="utf-8") as file:
    missions = file.readlines()
    mission_objects += [Mission(mission) for mission in missions]
rd.shuffle(mission_objects)
missions_for_now = []
for mission in mission_objects:
    if mission.getLevel() <= missionLevel:
        missions_for_now.append(f"({mission.getLevel()}) : {mission.getDescription()}")
        missionLevel -= mission.getLevel()
    if missionLevel <= 0:
        break

print("\n Missions for this operation:")
for mission in missions_for_now:
    print(f"  {mission}")
if replace_color : print(" Reminder : Submarine order is J, 🂿, Q, K. Captain is 🂿 \n")
else: print("")