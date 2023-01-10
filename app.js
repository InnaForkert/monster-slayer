const app = Vue.createApp({
  data() {
    return {
      playerHealth: 100,
      monsterHealth: 100,
      currentRound: 0,
      winner: null,
    };
  },
  computed: {
    monsterBarStyles() {
      if (this.monsterHealth < 0) {
        return { width: "0%" };
      }
      return { width: this.monsterHealth + "%" };
    },
    playerBarStyles() {
      if (this.playerHealth < 0) {
        return { width: "0%" };
      }
      return { width: this.playerHealth + "%" };
    },
    mayUseSpecialAttack() {
      return this.currentRound % 3 === 0;
    },
  },
  watch: {
    playerHealth(value) {
      if (value <= 0) {
        if (this.monsterHealth <= 0) {
          this.winner = "draw";
        } else {
          this.winner = "monster";
        }
      }
    },
    monsterHealth(value) {
      if (value <= 0) {
        if (this.playerHealth <= 0) {
          this.winner = "draw";
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
    },
    attackMonster() {
      const attackValue = getRandomValue(5, 12);
      this.monsterHealth -= attackValue;
      this.attackPlayer();
      this.currentRound += 1;
    },
    attackPlayer() {
      const attackValue = getRandomValue(8, 15);
      this.playerHealth -= attackValue;
    },
    specialAttackMonster() {
      const attackValue = getRandomValue(10, 25);
      this.monsterHealth -= attackValue;
      this.attackPlayer();
      this.currentRound += 1;
    },
    healPlayer() {
      this.currentRound += 1;
      const healValue = getRandomValue(8, 20);
      if (this.playerHealth + healValue > 100) {
        this.playerHealth = 100;
      } else {
        this.playerHealth += healValue;
      }
      this.attackPlayer();
    },
    surrender() {
      this.winner = "monster";
    },
  },
});

app.mount("#game");

function getRandomValue(min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
}