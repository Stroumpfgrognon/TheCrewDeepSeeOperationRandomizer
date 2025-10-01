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
            self.descriptionAlt = match.group(4).replace("green","club ♣").replace("blue","spade ♠").replace("pink","heart ♥").replace("yellow","diamond ♦").replace("submarines","[ faces 🃛🂭🂾 or jokers 🂿 ]").replace("submarine","[ face 🃛🂭🂾 or joker 🂿 ]")
            self.description = match.group(4)
        else:
            self.levels = []
            self.description = ""
            self.descriptionAlt = ""
    def getLevel(self,players=nbPlayers) -> int:
        return self.levels[players - 3]
    def getDescription(self,alt=replace_color) -> str:
        if alt:
            return self.descriptionAlt
        return self.description
    def __str__(self) -> str:
        return f"- ({self.getLevel()}) : {self.description}"

mission_object = []
with open("bin/missions.txt", "r", encoding="utf-8") as file:
    missions = file.readlines()
    mission_objects = [Mission(mission) for mission in missions]
with open("bin/custom_missions.txt", "r", encoding="utf-8") as file:
    missions = file.readlines()
    mission_objects += [Mission(mission) for mission in missions]

def generate_missions(players: int, level: int):
    selected_missions = []
    current_level = 0
    rd.shuffle(mission_objects)
    for mission in mission_objects:
        if mission.getLevel(players) <= level and (mission not in selected_missions):
            selected_missions.append(mission)
            current_level += mission.getLevel(players)
            level -= mission.getLevel(players)
        if level <= 0:
            break
    return selected_missions

if __name__ == "__main__":
    missions_for_now = generate_missions(nbPlayers, missionLevel)
    print("\n Missions for this operation:")
    for mission in missions_for_now:
        print(f"  {mission}")
    if replace_color : print(" Reminder : Submarine order is J, 🂿, Q, K. Captain is 🂿 \n")
    else: print("")