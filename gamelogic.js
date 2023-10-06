"use strict";
//import { setTimeout } from 'timers';
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Timer = exports.Game = exports.Team = void 0;
/****************  Defining Team Class  ******************/
var Team = /** @class */ (function () {
    function Team(team_no) {
        this.total_score = 0;
        this.win = false;
        this.player_no = 0;
        this.bowl_no = 0;
        this.team_no = team_no;
        this.score_matrix = [];
        for (var i = 0; i < 10; i++) {
            this.score_matrix[i] = [];
            for (var j = 0; j < 6; j++) {
                this.score_matrix[i][j] = 0;
            }
        }
    }
    return Team;
}());
exports.Team = Team;
var Game = /** @class */ (function () {
    function Game() {
        var _this = this;
        this.state = 0;
        this.updateScore = function (team) {
            var teamid = team.team_no;
            for (var i = 0; i < 10; i++) {
                var tot = 0;
                for (var j = 0; j < 6; j++) {
                    var id_str = String(teamid) + "-" + String(i) + "-" + String(j);
                    var cell = document.getElementById(id_str);
                    console.log(i + " " + j);
                    if (team.score_matrix[i][j] != 0) {
                        cell.innerText = String(team.score_matrix[i][j]);
                        tot += team.score_matrix[i][j];
                    }
                    if (tot != 0) {
                        var id_str = String(teamid) + "-" + String(i) + "-" + "6";
                        var cell_1 = document.getElementById(id_str);
                        var str = String(tot);
                        if (str[str.length - 1] === "W") {
                            str = str.substring(0, str.length - 1);
                        }
                        cell_1.innerText = String(str);
                    }
                }
                //update totals;
            }
        };
        this.timeover = function () {
            _this.state += 1;
            _this.handleButtonState(_this.state);
        };
        this.handleButtonState = function (state) {
            var hit1 = document.getElementById("hit1");
            var hit2 = document.getElementById("hit2");
            var start = document.getElementById("start");
            var generate = document.getElementById("generate");
            switch (state) {
                case 0:
                    hit1.disabled = true;
                    hit2.disabled = true;
                    break;
                case 1:
                    hit1.disabled = false;
                    hit2.disabled = true;
                    start.disabled = true;
                    break;
                case 2:
                    hit1.disabled = true;
                    hit2.disabled = true;
                    start.disabled = false;
                    break;
                case 3:
                    hit1.disabled = true;
                    hit2.disabled = false;
                    break;
                case 4:
                    hit1.disabled = true;
                    hit2.disabled = true;
                    start.disabled = false;
                    start.innerText = "Restart";
                    generate.disabled = false;
                    break;
            }
        };
        this.randomRun = function () {
            return Math.floor(Math.random() * 6);
        };
        this.handleHit = function (team) {
            if (gameInstance.state == 1 || gameInstance.state == 3) {
                var start = document.getElementById("start");
                start.disabled = true;
            }
            var runs = _this.randomRun();
            if (team.player_no != 9) {
                if (team.bowl_no != 5) {
                    if (runs != 0) {
                        team.total_score += runs;
                        team.score_matrix[team.player_no][team.bowl_no] = runs;
                        team.bowl_no++;
                    }
                    else {
                        team.score_matrix[team.player_no][team.bowl_no] = 'W';
                        team.bowl_no = 0;
                        team.player_no++;
                    }
                }
                else {
                    if (runs != 0) {
                        team.total_score += runs;
                        team.score_matrix[team.player_no][team.bowl_no] = runs;
                        team.bowl_no = 0;
                        team.player_no++;
                    }
                    else {
                        team.score_matrix[team.player_no][team.bowl_no] = 'W';
                        team.bowl_no = 0;
                        team.player_no++;
                    }
                }
            }
            else {
                if (team.bowl_no != 5) {
                    if (runs != 0) {
                        team.total_score += runs;
                        team.score_matrix[team.player_no][team.bowl_no] = runs;
                        team.bowl_no++;
                    }
                    else {
                        team.score_matrix[team.player_no][team.bowl_no] = 'W';
                        gameInstance.state = (gameInstance.state + 1) % 5;
                        console.log(team.total_score);
                        _this.handleButtonState(gameInstance.state);
                        _this.timer.pause();
                    }
                }
                else {
                    if (runs != 0) {
                        team.total_score += runs;
                        team.score_matrix[team.player_no][team.bowl_no] = runs;
                        gameInstance.state = (gameInstance.state + 1) % 5;
                        console.log(team.total_score);
                        _this.handleButtonState(gameInstance.state);
                        _this.timer.pause();
                    }
                    else {
                        team.score_matrix[team.player_no][team.bowl_no] = 'W';
                        gameInstance.state = (gameInstance.state + 1) % 5;
                        console.log(team.total_score);
                        _this.handleButtonState(gameInstance.state);
                        _this.timer.pause();
                    }
                }
            }
            if (team.team_no == 1) {
                var score_1 = document.getElementById("score-1");
                score_1.innerText = String(team.total_score);
            }
            else {
                var score_2 = document.getElementById("score-2");
                score_2.innerText = String(team.total_score);
            }
            console.log(team.score_matrix);
            _this.updateScore(team);
        };
        this.play = function () {
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
            var time = document.getElementById("time");
            time.innerText = String(60);
            var generate = document.getElementById("generate");
            generate.disabled = true;
            var team_1 = new Team(1);
            var team_2 = new Team(2);
            var score_1 = document.getElementById("score-1");
            score_1.innerText = "0";
            var score_2 = document.getElementById("score-2");
            score_2.innerText = "0";
            var hit1 = document.getElementById("hit1");
            hit1.disabled = true;
            var hit2 = document.getElementById("hit2");
            hit2.disabled = true;
            var start = document.getElementById("start");
            start.addEventListener("click", function () {
                if (_this.state == 0) {
                    hit1.disabled = false;
                    _this.state = 1;
                    _this.timer = new Timer(60, _this);
                    _this.handleButtonState(_this.state);
                }
                if (_this.state == 2) {
                    hit2.disabled = false;
                    _this.state = 3;
                    _this.timer = new Timer(60, _this);
                    _this.handleButtonState(_this.state);
                }
                if (_this.state == 4) {
                    window.location.reload();
                }
            });
            var generate = document.getElementById("generate");
            generate.addEventListener("click", function () {
                if (team_1.total_score > team_2.total_score) {
                    var verdict = "Team 1 won by ".concat(team_1.total_score - team_2.total_score, " runs");
                    var result = document.getElementById("result");
                    result.innerText = verdict;
                }
                else if (team_2.total_score > team_1.total_score) {
                    var verdict = "Team 2 won by ".concat(team_2.total_score - team_1.total_score, " runs");
                    var result = document.getElementById("result");
                    result.innerText = verdict;
                }
                else {
                    var verdict = "Its a draw";
                    var result = document.getElementById("result");
                    result.innerText = verdict;
                }
            });
            hit1.addEventListener("click", function () {
                _this.handleHit(team_1);
            });
            hit2.addEventListener("click", function () {
                _this.handleHit(team_2);
            });
        };
    }
    return Game;
}());
exports.Game = Game;
/*********************************************/
/****************** Timer ************************/
function delay(delay) {
    return new Promise(function (r) {
        setInterval(r, delay);
    });
}
var Timer = /** @class */ (function () {
    function Timer(counter, obj) {
        if (counter === void 0) { counter = 60; }
        this.counter = counter;
        this.doTimer();
        this.isPaused = false;
        this.game = obj;
    }
    Timer.prototype.doTimer = function () {
        return __awaiter(this, void 0, void 0, function () {
            var i;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        i = this.counter;
                        _a.label = 1;
                    case 1:
                        if (!(i >= 0)) return [3 /*break*/, 6];
                        if (!this.isPaused) return [3 /*break*/, 3];
                        return [4 /*yield*/, new Promise(function (resolve) { setTimeout(resolve, 100); })];
                    case 2:
                        _a.sent();
                        i++;
                        return [3 /*break*/, 5];
                    case 3: return [4 /*yield*/, delay(1000)];
                    case 4:
                        _a.sent();
                        this.present = i;
                        document.getElementById("time").innerText = String(i);
                        if (i == 0) {
                            this.game.timeover();
                        }
                        _a.label = 5;
                    case 5:
                        i--;
                        return [3 /*break*/, 1];
                    case 6: return [2 /*return*/];
                }
            });
        });
    };
    Timer.prototype.pause = function () {
        this.isPaused = true;
    };
    Timer.prototype.resume = function () {
        this.isPaused = false;
    };
    return Timer;
}());
exports.Timer = Timer;
/*************************************************/
var gameInstance = new Game();
gameInstance.play();
