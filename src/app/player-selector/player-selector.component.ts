import { Component, OnInit } from '@angular/core';
import { PlayerSelectorService } from './player-selector.service';

@Component({
  selector: 'app-player-selector',
  templateUrl: './player-selector.component.html',
  styleUrls: ['./player-selector.component.scss']
})
export class PlayerSelectorComponent {
  playersList: Player[] = [];
  excludedGolfers = [];
  includedGolfers = [];
  allGolfersList: Golfer[] = [];
  potentialGolfers: Golfer[] = [];
  messageList: string[] = [];
  golferPerPlayer = 0;
  ganeStarted = false;

  constructor(
    private playerSelectorService: PlayerSelectorService
  ) { }


  setGolferPerPlayer(value: string) {
    // tslint:disable-next-line:radix
    this.golferPerPlayer = parseInt(value);
  }

  chooseRandomPlayer(playersInDraw) {
    return playersInDraw[Math.floor(Math.random() * playersInDraw.length)];
  }

  startDraw() {
    if (this.playersList && this.playersList.length === 0) {
      alert('At least one player is required');
      return;
    }

    if (!this.golferPerPlayer || this.golferPerPlayer === 0) {
      alert('Golfers per player must be set');
      return;
    }
    this.ganeStarted = true;
    this.playerSelectorService.getPlayers()
      .subscribe(response => {
        this.allGolfersList = [];
        const max = 100;
        for (let i = 0; i < max; i++) {
          if (!this.excludedGolfers.includes(response[i].Name)) {
            this.allGolfersList.push(
              new Golfer(response[i].PlayerID, response[i].Name, i + 1)
            );
          }
        }

        let playersInDraw = [...this.playersList];
        this.potentialGolfers = [];

        this.selectTopGolfers(this.playersList.length * this.golferPerPlayer);

        if (this.includedGolfers && this.includedGolfers.length) {
          this.potentialGolfers.splice(this.potentialGolfers.length - this.includedGolfers.length, this.includedGolfers.length);
          this.potentialGolfers = this.potentialGolfers.concat(this.includedGolfers);
        }

        this.potentialGolfers.forEach((pg, index) => {
          const interval = 1000;
          setTimeout(() => {
            const playerToPick = this.chooseRandomPlayer(playersInDraw);
            this.messageList.push(`Player picked is ${playerToPick.name}`);

            this.messageList.push(`${playerToPick.name} has drawn ${pg.name}`);
              playerToPick.golfers.push(pg);

              if (playerToPick.golfers.length === this.golferPerPlayer) {
                playersInDraw = playersInDraw.filter(p => p.id !== playerToPick.id);
              }

              this.potentialGolfers = this.potentialGolfers.filter(gf => gf.id !== pg.id);
          }, index * interval);
        });

      });
  }

  selectTopGolfers(numOfGolfersToPick) {
    for (const [index, value] of this.allGolfersList.entries()) {
      if (index === numOfGolfersToPick) {
        break;
      }
      this.potentialGolfers.push(value);
    }
  }

  add(name: string): void {
    if (!name) {
      alert('Name is required');
      return;
    }
    name = name.trim();
    const newId = this.playersList.length + 1;
    this.playersList.push(new Player(newId, name, []));
  }

  delete(player: Player): void {
    this.playersList = this.playersList.filter(h => h !== player);
  }

  excludeGolfer(golfer) {
    this.excludedGolfers.push(golfer);
  }

  includeGolfer(golfer) {
    this.includedGolfers.push(new Player(33, golfer, []));
  }

}

class Player {
  constructor(public id: number, public name: string, public golfers: Golfer[]) { }
}

class Golfer {
  constructor(public id: number, public name: string, public rank: number) { }
}
