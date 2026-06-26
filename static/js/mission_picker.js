const original_missions = `(2/3/3) Win more tricks than everyone else
(3/4/5) Win more tricks than everyone else together
(2/2/3) Win fewer tricks than everyone else
(2/2/3) Win more tricks than the captain (the captain can’t take this mission)
(2/2/2) Win fewer tricks than the captain (the captain can’t take this mission)
(4/3/3) Win the same number of tricks as the captain (the captain can’t take this mission)
(2/3/3) Win a trick where all cards are of lower value than 7 without submarines
(2/3/4) Win a trick where all cards are of greater value than 5
(2/3/3) Win a trick with a 6.
(2/3/4) Win a trick with a 5.
(3/4/5) Win a trick with a 3.
(1/2/2) Win a 5 with a 7.
(3/4/5) Win an 8 with a 4.
(2/3/4) Win any 6 with a another 6.
(3/4/5) Win a trick with a 2.
(1/1/1) Win the pink 3
(1/1/1) Win the yellow 1
(1/1/1) Win the blue 4
(1/1/1) Win the green 6
(3/4/5) Win all four 3s.
(3/4/5) Win at least three 5s.
(3/4/5) Win at least three 9s.
(2/2/2) Win at least two 7s.
(4/5/6) Win all four 9s.
(3/4/4) Win exactly three 6s
(2/3/3) Win exactly two 9s
(2/3/3) Win the blue 1,2 and 3
(2/2/3) Win the blue 6 and the yellow 7
(2/2/3) Win the pink 5 and yellow 6
(2/2/3) Win the green 5 and blue 8
(2/2/3) Win the blue 5 and pink 8
(2/2/3) Win the pink 9 and yellow 8
(2/2/2) Win the pink 1 and green 7
(2/3/3) Win the yellow 9 and blue 7
(3/4/4) Win the green 3 and the yellow 4 and 5
(3/4/5) Win the green 2 in the last trick
(4/4/4) Win exactly one pink and one green card
(3/3/3) Win at least seven yellow cards
(2/3/3) Win at least five pink cards
(3/4/4) Win exactly two green cards.
(3/4/4) Win exactly two blue cards.
(3/3/4) Win exactly one pink card.
(2/2/2) Win no pink cards.
(2/3/4) Win at least one card of each colour (excluding submarines)
(3/4/5) Win all cards of at least one colour (excluding submarines)
(2/5/6) Win a trick that has only even numbers (2,4,6,8)
(2/4/5) Win a trick that has only numbers (1,3,5,7,9)
(3/3/4) Win a trick with a total value higher than 23/28/31 (3/4/5 players) without submarines
(3/3/4) Win a trick with a total value lower than 8/12/16 (3/4/5 players) without submarines
(3/3/4) Win a trick with a total value of 22 or 23
(3/3/3) Win exactly one submarine (deal new cards if someone has all submarines in hand)
(3/3/3) Win the 1 submarine and no other (deal new cards if someone has submarines no. 1 and 4 or 1,2,3 in hand)
(3/3/3) Win the 2 submarine and no other (deal new cards if someone has submarines no. 2 and 4 or 1,2,3 in hand)
(1/1/1) Win the 3 submarine
(3/3/4) Win exactly two submarines (deal new cards if someone has submarines no. 2,3,4 in hand)
(3/4/4) Win exactly three submarines (deal new cards if someone has all submarines in hand)
(1/1/1) Win no submarines
(3/3/3) Win the pink 7 with a submarine
(3/3/3) Win the green 9 with a submarine
(4/3/3) Don’t open a trick with a pink, yellow or blue card
(2/1/1) Don’t open a trick with a pink or green card
(2/2/2) Don’t win any green cards
(2/2/2) Don’t win any yellow cards
(3/3/3) Don’t win any pink or blue cards
(3/3/3) Don’t win any yellow or green cards
(3/3/2) Don’t win any 8s or 9s
(1/1/1) Don’t win any 9s
(1/2/2) Don’t win any 5s
(2/2/2) Don’t win any 1s
(3/3/3) Don’t win any 1s, 2s or 3s
(1/2/3) Don’t win any of the first four tricks
(1/2/2) Don’t win any of the first three tricks
(2/3/3) Don’t win any of the first five tricks
(4/3/3) Don’t win any tricks
(3/2/2) Do not win two consecutive tricks.
(2/3/3) Win the last trick
(2/3/4) Win the first three tricks
(1/1/2) Win the first two tricks
(1/1/1) Win the first trick
(3/4/4) Win the first and the last trick
(4/4/4) I win only the last trick
(4/3/3) I win only the first trick
(3/2/2) Win exactly one trick
(2/2/2) Win exactly two tricks
(1/1/1) Win two consecutive tricks
(2/3/4) Win three consecutive tricks
(2/3/5) Win exactly four tricks
(3/3/4) Win exactly three consecutive tricks.
(3/3/3) Win exactly two consecutive tricks.
(3/2/2) Win X tricks (predict the exact number and show)
(4/3/3) Win X tricks (predict the exact number but keep hidden)
(4/4/4) Win the same amount of pink and yellow cards (more than 0)
(2/3/3) Win the same amount of green and yellow cards in a trick (more than 0)
(2/3/3) Win the same amount of pink and blue cards in a trick (more than 0)
(1/1/1) Win more yellow cards than blue cards (0 blue cards are allowed)
(1/1/1) Win more pink cards than green cards (0 green cards are allowed)
`

function shuffle(array) {
  let currentIndex = array.length;

  // While there remain elements to shuffle...
  while (currentIndex != 0) {

    // Pick a remaining element...
    let randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;

    // And swap it with the current element.
    [array[currentIndex], array[randomIndex]] = [
      array[randomIndex], array[currentIndex]];
  }
}

function convert_description(desc) {
    return desc.replaceAll("green","♣").replaceAll("blue","♠").replaceAll("pink","♥").replaceAll("yellow","♦").replaceAll("submarines","J/Q/K/🂿").replaceAll("submarine","J/Q/K/🂿")
}

class Mission {
    difficulties;
    description;
    description_converted;
    constructor (text) {
        const parts = text.match(/^\((\d)\/(\d)\/(\d)\) (.+)$/);
        this.description = parts[4];
        this.difficulties = [parseInt(parts[1]), parseInt(parts[2]), parseInt(parts[3])];
        this.description_converted = convert_description(this.description);
    }
}

class MissionList {
    missions;
    constructor(mission_text) {
        this.missions = mission_text.split("\n").filter(line => !line.startsWith("---") && line.trim().length > 0).map(line => new Mission(line));
    }

    pick_random_mission(player_count,difficulty ,converted=false) {
        shuffle(this.missions);
        let selected_missions = [];
        let i=0;
        while (difficulty>0 && i<this.missions.length) {
            let mission = this.missions[i];
            if (mission.difficulties[player_count-3] <= difficulty) {
                selected_missions.push([mission.difficulties[player_count-3], converted ? mission.description_converted : mission.description]);
                difficulty -= mission.difficulties[player_count-3];
            }
            i++;
        }
        return selected_missions;
    }
}

export default MissionList;
export {original_missions};

