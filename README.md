# Operation randomizer for THE CREW : Mission Deep Sea

This tool helps generate the list of missions for a crew, depending on the amount of players playing (first argument) and the level of the mission (second argument).

The missions are selected at random and kept until the exact level of the mission is attained, like the rules state.

# Command-line tool

## Usage example

> python ./crewOperationRandomizer.py 3 8

Will find missions for 3 players at a total difficulty of 8.

Example of result of said command :

```

Missions for this operation:
  - (2) : Win exactly two tricks
  - (1) : Win the blue 4
  - (3) : Don’t win any yellow or green cards
  - (2) : Win a trick that has only even numbers (2,4,6,8)

> Reminder : If a mission doesn't mention Submarines/Black, only colored cards are valid for the mission

```

With format (_Difficulty_) - _Description_

## Adaptation for classical playing cards

There is also a translation system for a regular 54 cards game that can be activated by adding any non-zero numbered third argument.

> python ./crewOperationRandomizer.py 3 8 1

```

Missions for this operation:
  - (2) : Win a trick with a 5.
  - (2) : Win exactly two tricks
  - (4) : Win exactly one ♥ and one ♣ card

> Reminder : If a mission doesn't mention Submarines/Black, only colored cards are valid for the mission
> Reminder n°2 : Faces & Joker 1,2,3,4 are J,Q,K,🂿 in order. Captain is 🂿

```

The adaptation is based on the following :

|       Original       |           Adapted            |
| :------------------: | :--------------------------: |
| Submarines (1,2,3,4) | (J,Q,K,🂿) with 🂿 for captain |
|         Blue         |           Spade ♠            |
|         Pink         |           Heart ♥            |
|        Yellow        |          Diamond ♦           |
|        Green         |            Club ♣            |

## Customisation

Additional custom missions can be added in the _bin/custom_missions.txt_ file by using the same format as the original ones in _bin/missions.txt_. The format is (Difficulty) Description with Difficulty being for (3/4/5) players.

# Web interface

The Web interface uses flask to serve the files and webbrowser to automatically open your browser on the page on startup.

To start the interface, simply run

> python ./webInterface.py

Which will open the interface on your default browser. You can close the server using CTRL + C.

![Web interface screenshot](/static/images/screenshot.png)

The web interface uses the command-line tool as a backend so the way to add custom missions is the same as in the command-line tool. 

The server needs to be restarted when new missions are added.

## Ressources

For premade operations from physical the game, see [this fan-made mission sheet](https://desktopgames.com.ua/games/6389/the_crew_2_mission_sheet_v1c_en.pdf?srsltid=AfmBOorRTjvEAGTZIKLItwlM81yBnoAYrTeMrZYyuwdJ0hrtgVMM_T7G) by Thomas Sing.

The list of official missions was taken from [this blog post](https://boardgamegeek.com/thread/2631311/all-the-mission-cards)
