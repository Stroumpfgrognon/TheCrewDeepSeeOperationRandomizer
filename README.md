# Random mission generator for THE CREW : Mission Deep Sea

This tool helps generate the list of missions for a crew, depending on the amount of players playing (first argument) and the level of the mission (second argument). 

The missions are selected at random and kept until the exact level of the mission is attained, like the rules state.

## Usage example

> python ./crewMissionRandomizer.py 3 8

Will find missions for 3 players at a total difficulty of 8.

Example of result of said command : 
```
Missions for this operation:
- (3) : Win exactly two submarines (deal new cards if someone has submarines no. 2,3,4 in hand)
- (1) : Win the first trick
- (2) : Don’t win any yellow cards
- (2) : Don’t win any green cards
```

With format (_Difficulty_) - _Description_

## Customisation

Additional custom missions can be added in the *bin/custom_missions.txt* file by using the same format as the original ones in *bin/missions.txt*. The format is (Difficulty) Description with Difficulty being for (3/4/5) players.

## Ressources

For premade operations from physical the game, see [this fan-made mission sheet](https://desktopgames.com.ua/games/6389/the_crew_2_mission_sheet_v1c_en.pdf?srsltid=AfmBOorRTjvEAGTZIKLItwlM81yBnoAYrTeMrZYyuwdJ0hrtgVMM_T7G) by Thomas Sing.

The list of official missions was taken from [this blog post](https://boardgamegeek.com/thread/2631311/all-the-mission-cards)

