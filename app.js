const app = Vue.createApp({
  data() {
    return {
      gameStarted: false,
      playerHealth: 100,
      monsterHealth: 100,
      currentRound: 0,
      winner: null,
      logMessages: [],
      specialAttackCounter: 0,
      level: 1,
      monsters: [
        {
          img: "./img/1.jpg",
          name: "Stinky",
        },
        {
          img: "/img/2.png",
          name: "Saddy",
        },
        {
          img: "/img/3.png",
          name: "Worky",
        },
        {
          img: "/img/4.png",
          name: "Cringy",
        },
        {
          img: "/img/5.png",
          name: "Godslayer",
        },
      ],
    };
  },
  computed: {
    monsterBarStyles() {
      if (this.monsterHealth <= 0) {
        return { width: "0%" };
      }
      return { width: this.monsterHealth + "%" };
    },
    playerBarStyles() {
      if (this.playerHealth <= 0) {
        return { width: "0%" };
      }
      return { width: this.playerHealth + "%" };
    },
    mayUseSpecialAttack() {
      return this.specialAttackCounter >= 3;
    },
  },
  watch: {
    playerHealth(value) {
      if (value <= 0) {
        alert("You were defeated!");
        this.level = 1;
        this.specialAttackCounter = 0;
        this.winner = "monster";
      }
    },
    monsterHealth(value) {
      if (value <= 0) {
        if (this.level < 5) {
          this.level += 1;
          setTimeout(
            () => alert("Victory! Next level will not be that easy!"),
            0
          );
          this.playerHealth = 100;
          this.monsterHealth = 100;
        } else {
          this.winner = "player";
        }
      }
    },
  },
  methods: {
    startGame() {
      this.playerHealth = 100;
      this.monsterHealth = 100;
      this.winner = null;
      this.currentRound = 0;
      this.logMessages = [];
    },
    attackMonster() {
      const attackValue = getRandomValue(5, 12);
      this.monsterHealth -= attackValue;
      this.addLogMessage("player", "attack", attackValue);
      this.attackPlayer();
      this.currentRound += 1;
      this.specialAttackCounter += 1;
    },
    attackPlayer() {
      const attackValue = getRandomValue(8, 15);
      this.playerHealth -= attackValue;
      this.addLogMessage("monster", "attack", attackValue);
    },
    specialAttackMonster() {
      const attackValue = getRandomValue(10, 25);
      this.monsterHealth -= attackValue;
      this.addLogMessage("player", "special-attack", attackValue);
      this.attackPlayer();
      this.currentRound += 1;
      this.specialAttackCounter = 0;
    },
    healPlayer() {
      this.currentRound += 1;
      this.specialAttackCounter += 1;
      const healValue = getRandomValue(8, 20);
      if (this.playerHealth + healValue > 100) {
        this.playerHealth = 100;
      } else {
        this.playerHealth += healValue;
      }
      this.addLogMessage("player", "heal", healValue);
      this.attackPlayer();
    },
    surrender() {
      this.winner = "monster";
    },
    addLogMessage(who, what, value) {
      this.logMessages.unshift({
        actionBy: who,
        actionType: what,
        actionValue: value,
      });
    },
  },
});

app.mount("#game");

function getRandomValue(min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
}
