# Random mission generator for THE CREW : Mission Deep Sea

This tool helps generate the list of missions for a crew, depending on the amount of players playing (first argument) and the level of the mission (second argument). 

The missions are selected at random and kept until the exact level of the mission is attained, like the rules state.

## Usage example

> python ./crewMissionRandomizer.py 3 8

Will find missions for 3 players at a total difficulty of 8.

Example of result of said command : 
```
 Missions for this operation:
  (3) : Win exactly two blue cards.
  (2) : Win the blue 5 and pink 8
  (3) : Win exactly three consecutive tricks.
```

With format (_Difficulty_) - _Description_

## Adaptation for classical playing cards
There is also a translation system for a regular 54 cards game that can be activated by adding any non-zero numbered third argument.

> python ./crewMissionRandomizer.py 3 8 1
```
 Missions for this operation:
  (1) : Win no [ faces 🃛🂭🂾 or jokers 🂿 ]
  (2) : Win the same amount of club ♣ and diamond ♦ cards in a trick (more than 0)
  (1) : Win more diamond ♦ cards than spade ♠ cards (0 spade ♠ cards are allowed)
  (3) : Win a trick with a total value lower than 8/12/16 (3/4/5 players) without [ faces 🃛🂭🂾 or jokers 🂿 ]
  (1) : Win the heart ♥ 3
 Reminder : Submarine order is J, 🂿, Q, K. Captain is 🂿
```

The adaptation is based on the following : 

| Original | Adapted |
| :--------: | :-------: |
| Submarines (1,2,3,4) | (J,🂿,Q,K) with 🂿 for captain|
| Blue | Spade ♠ |
| Pink | Heart ♥ |
| Yellow | Diamond ♦ |
| Green | Club ♣ |

## Customisation

Additional custom missions can be added in the *bin/custom_missions.txt* file by using the same format as the original ones in *bin/missions.txt*. The format is (Difficulty) Description with Difficulty being for (3/4/5) players.

## Ressources

For premade operations from physical the game, see [this fan-made mission sheet](https://desktopgames.com.ua/games/6389/the_crew_2_mission_sheet_v1c_en.pdf?srsltid=AfmBOorRTjvEAGTZIKLItwlM81yBnoAYrTeMrZYyuwdJ0hrtgVMM_T7G) by Thomas Sing.

The list of official missions was taken from [this blog post](https://boardgamegeek.com/thread/2631311/all-the-mission-cards)

