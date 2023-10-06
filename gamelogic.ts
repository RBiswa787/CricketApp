//import { setTimeout } from 'timers';

/****************  Defining Team Class  ******************/

export class Team {
    team_no : number;
    total_score : number = 0;
    win : boolean = false;
    score_matrix : any[][];
    player_no: number = 0;
    bowl_no: number = 0;
   
    constructor(team_no: number) {
        this.team_no = team_no;
        this.score_matrix = [];
        for(var i: number = 0; i < 10; i++) {
            this.score_matrix[i] = [];
            for(var j: number = 0; j< 6; j++) {
                this.score_matrix[i][j] = 0;
            }
         }
    }
}


export class Game {
    state: number = 0;
    timer: Timer;
    updateScore = (team: Team) => {
        var teamid = team.team_no;
        for(let i = 0 ;i < 10; i++){
            var tot = 0;
            for(let j = 0; j < 6; j++){
                var id_str = String(teamid) + "-" + String(i) + "-" + String(j);
                const cell = document.getElementById(id_str);
                console.log(i +" "+j);
                if(team.score_matrix[i][j] != 0){
                cell.innerText = String(team.score_matrix[i][j]);
                tot += team.score_matrix[i][j];
            }
            if(tot != 0){
                var id_str = String(teamid) + "-" + String(i) + "-" + "6";
                const cell = document.getElementById(id_str);
                var str = String(tot);
                if(str[str.length-1] === "W") {
                    str = str.substring(0, str.length-1);
                }
                cell.innerText = String(str);
            }
        }
        //update totals;
    }
    }
    timeover = () => {
        this.state += 1;
        this.handleButtonState(this.state);
    }
    handleButtonState = (state: number) => {
        const hit1 = document.getElementById("hit1");
        const hit2 = document.getElementById("hit2");
        const start = document.getElementById("start");
        const generate = document.getElementById("generate");
        switch(state){
            case 0:
                (hit1 as HTMLButtonElement).disabled = true;
                (hit2 as HTMLButtonElement).disabled = true;
            break;
            case 1:
                (hit1 as HTMLButtonElement).disabled = false;
                (hit2 as HTMLButtonElement).disabled = true;
                (start as HTMLButtonElement).disabled = true;
            break;
            case 2:
                (hit1 as HTMLButtonElement).disabled = true;
                (hit2 as HTMLButtonElement).disabled = true;
                (start as HTMLButtonElement).disabled = false;
            break;
            case 3:
                (hit1 as HTMLButtonElement).disabled = true;
                (hit2 as HTMLButtonElement).disabled = false;
            break;
            case 4:
                (hit1 as HTMLButtonElement).disabled = true;
                (hit2 as HTMLButtonElement).disabled = true;
                (start as HTMLButtonElement).disabled = false;
                (start as HTMLButtonElement).innerText = "Restart";
                (generate as HTMLButtonElement).disabled = false;
            break;
        }
    }
    randomRun = () => {
        return Math.floor(Math.random() * 6);
    }
    handleHit = (team: Team) => {
        if(gameInstance.state == 1 || gameInstance.state == 3){
            const start = document.getElementById("start");
            (start as HTMLButtonElement).disabled = true;
        }
        var runs = this.randomRun();
        if(team.player_no != 9){
            if(team.bowl_no != 5){
                if(runs != 0){
                    team.total_score += runs;
                    team.score_matrix[team.player_no][team.bowl_no] = runs;
                    team.bowl_no++;
                }
                else{
                    team.score_matrix[team.player_no][team.bowl_no] = 'W';
                    team.bowl_no = 0;
                    team.player_no++;
                }
            }
            else{
                if(runs != 0){
                    team.total_score += runs;
                    team.score_matrix[team.player_no][team.bowl_no] = runs;
                    team.bowl_no = 0;
                    team.player_no++;
                }
                else{
                    team.score_matrix[team.player_no][team.bowl_no] = 'W';
                    team.bowl_no = 0;
                    team.player_no++;
                }
            }
            
        }
        else{
            if(team.bowl_no != 5){
                if(runs != 0){
                    team.total_score += runs;
                    team.score_matrix[team.player_no][team.bowl_no] = runs;
                    team.bowl_no++;
                }
                else{
                    team.score_matrix[team.player_no][team.bowl_no] = 'W';
                    gameInstance.state = (gameInstance.state + 1)%5;
                    console.log(team.total_score);
                    this.handleButtonState(gameInstance.state);
                    this.timer.pause();
                }
            }
            else{
                if(runs != 0){
                    team.total_score += runs;
                    team.score_matrix[team.player_no][team.bowl_no] = runs;
                    gameInstance.state = (gameInstance.state + 1)%5;
                    console.log(team.total_score);
                    this.handleButtonState(gameInstance.state);
                    this.timer.pause();
                }
                else{
                    team.score_matrix[team.player_no][team.bowl_no] = 'W';
                    gameInstance.state = (gameInstance.state + 1)%5;
                    console.log(team.total_score);
                    this.handleButtonState(gameInstance.state);
                    this.timer.pause();
                }
            }
        }
        if(team.team_no == 1){
            const score_1 = document.getElementById("score-1");
            score_1.innerText = String(team.total_score);
        }
        else{
            const score_2 = document.getElementById("score-2");
            score_2.innerText = String(team.total_score);
        }
        console.log(team.score_matrix);
        this.updateScore(team);
    }
    play = () =>{
        /****************************************/
        // const table = document.getElementById("table");
        // for(var i=0;i<8;i++){
        //     const row = (table as HTMLTableElement).insertRow();
        //     for(var j=0;j<11;j++){
        //         if(i==0 || j==0){
        //             const th = row.insertCell();
        //             th.style.fontWeight = "bold";
        //         }
        //         else{

        //         }
        //     }
        // }
        /****************************************/
        const time = document.getElementById("time");
        time.innerText = String(60);

        const generate = document.getElementById("generate");
        (generate as HTMLButtonElement).disabled = true;
        
        const team_1 = new Team(1);
        const team_2 = new Team(2);

        const score_1 = document.getElementById("score-1");
        score_1.innerText = "0";
        const score_2 = document.getElementById("score-2");
        score_2.innerText = "0";
        
        const hit1 = document.getElementById("hit1");
        (hit1 as HTMLButtonElement).disabled = true;
        const hit2 = document.getElementById("hit2");
        (hit2 as HTMLButtonElement).disabled = true;

        const start = document.getElementById("start");
        start.addEventListener("click", () => {
        
        if(this.state == 0){
        (hit1 as HTMLButtonElement).disabled = false;
        this.state = 1;
        this.timer = new Timer(60,this); 
        this.handleButtonState(this.state);
        }
        if(this.state == 2){
            (hit2 as HTMLButtonElement).disabled = false; 
            this.state = 3;
            this.timer = new Timer(60,this); 
            this.handleButtonState(this.state);
        }
        if(this.state == 4){
            window.location.reload();
        }
         
        });
        
        generate.addEventListener("click", () => {
            if(team_1.total_score > team_2.total_score){
                let verdict = `Team 1 won by ${team_1.total_score - team_2.total_score} runs`;
                const result = document.getElementById("result");
                result.innerText = verdict;
            }
            else if(team_2.total_score > team_1.total_score){
                let verdict = `Team 2 won by ${team_2.total_score - team_1.total_score} runs`;
                const result = document.getElementById("result");
                result.innerText = verdict;
            }
            else{
                let verdict = `Its a draw`;
                const result = document.getElementById("result");
                result.innerText = verdict;
            }
        });



        hit1.addEventListener("click",() => {
            this.handleHit(team_1);
        })

        hit2.addEventListener("click",() => {
            this.handleHit(team_2);
        })

    }
}
/*********************************************/

/****************** Timer ************************/

function delay(delay: number): Promise<void> {
    return new Promise<void>(r => {
        setInterval(r, delay);
    });
}

export class Timer {
    present: number;
    isPaused: boolean;
    game: Game;
    
    constructor(public counter: number = 60,obj: Game) {
      this.doTimer();
      this.isPaused = false;
      this.game = obj;
    }
  
    async doTimer() {
      for (let i = this.counter; i >= 0; i--) {
        if (this.isPaused) {
          await new Promise(resolve => { setTimeout(resolve, 100); });
          i++; 
          continue; 
        }
        await delay(1000);
        this.present = i;
        document.getElementById("time").innerText = String(i);
        if(i==0){
            this.game.timeover();
        }
      }
    }
  
    pause() {
      this.isPaused = true;
    }
  
    resume() {
      this.isPaused = false;
    }
  }

/*************************************************/

const gameInstance = new Game();
gameInstance.play();
