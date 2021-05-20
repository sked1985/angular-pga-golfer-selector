import { Component, OnInit } from '@angular/core';
import { PlayerSelectorService } from './player-selector.service';

@Component({
  selector: 'app-player-selector',
  templateUrl: './player-selector.component.html',
  styleUrls: ['./player-selector.component.scss']
})
export class PlayerSelectorComponent implements OnInit {
  playersList: Player[] = [];
  allGolfersList: Golfer[] = [];
  potentialGolfers: Golfer[] = [];
  messageList: string[] = [];
  golferPerPlayer = 0;

  constructor(
    private playerSelectorService: PlayerSelectorService
  ) { }

  ngOnInit(): void {
    this.playerSelectorService.getPlayers()
      .subscribe(response => {
        this.allGolfersList = response.map((golfer, index) => new Golfer(golfer.PlayerID, golfer.Name, index + 1));
      });
  }

  setGolferPerPlayer(value: string) {
    // tslint:disable-next-line:radix
    this.golferPerPlayer = parseInt(value);
  }

  chooseRandomPlayer(playersInDraw) {
    return playersInDraw[Math.floor(Math.random() * playersInDraw.length)];
  }

  startDraw() {
    let playersInDraw = [...this.playersList];
    this.potentialGolfers = [];

    if (this.playersList && this.playersList.length === 0) {
      alert('At least one player is required');
    }

    if (!this.golferPerPlayer || this.golferPerPlayer === 0) {
      alert('Golfers per player must be set');
    }

    this.selectTopGolfers(this.playersList.length * this.golferPerPlayer);

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

}

class Player {
  constructor(public id: number, public name: string, public golfers: Golfer[]) { }
}

class Golfer {
  constructor(public id: number, public name: string, public rank: number) { }
}
