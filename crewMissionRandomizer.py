import random as rd
import re
import sys

if len(sys.argv) < 3:
    nbPlayers = 3
    missionLevel = 10
else :
    nbPlayers = int(sys.argv[1])
    missionLevel = int(sys.argv[2])
    if nbPlayers < 3 or nbPlayers > 5:
        print("Number of players must be between 3 and 5")
        sys.exit(1)

class Mission:
    def __init__(self, level: str):
        match = re.match(r"\((\d)/(\d)/(\d)\) (.+)", level)
        if match:
            self.levels = [int(match.group(1)), int(match.group(2)), int(match.group(3))]
            self.description = match.group(4)
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
with open("bin/customMissions.txt", "r", encoding="utf-8") as file:
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

print("Missions for this operation:")
for mission in missions_for_now:
    print(f"- {mission}")