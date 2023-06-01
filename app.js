function calculateAttackValue(min, max){
  return Math.floor(Math.random() * (max-min)) + min;
}

const app = Vue.createApp({
  data () {
    return {
      playerHealth: 100,
      monsterHealth: 100,
      currentRound: 0,
      winner: null,
      logMessages: [],
    }
  },
  watch: {
    playerHealth(value){
      if(value <= 0 && this.monsterHealth <=0){
        this.winner = 'draw'
        // a draw
      }else if (value <= 0) {
        // player lost
        this.winner = 'monster'
      }
      
    },
    monsterHealth(value){
      if(value <= 0 && this.playerHealth <=0){
        // a draw
        this.winner = 'draw'
      }else if (value <= 0) {
        // player lost
        this.winner = 'player'
      }
    },
  },

  computed: {
    monsterBarStyle() {
      if(this.monsterHealth < 0){
        return { width: '0%'}
      }
      return {width: this.monsterHealth + '%'}
    },
   playerBarStyle() {
    if(this.playerHealth < 0){
      return { width: '0%'}
    }
      return {width: this.playerHealth + '%'}
    },
    mayUseSpecialAttack() {
      return this.currentRound % 3 !== 0;
    }
  },

  methods: {
    attackMonster() {
      this.currentRound++;
      const attackValue = calculateAttackValue(12,5)
      this.monsterHealth -= attackValue;
      this.attackPlayer();
      this.addLogMessage('player', 'attack', attackValue);
      
    },
    attackPlayer(){
      const attackValue = calculateAttackValue(12,5)
      this.playerHealth -= attackValue;
      this.addLogMessage('monster', 'attack', attackValue);
    },

    specialAttackMonster(){
      this.currentRound++;
      const attackValue = calculateAttackValue(10,25)
      this.monsterHealth -= attackValue;
      this.attackPlayer();
      this.addLogMessage('player', 'attack', attackValue);
    },

    healPlayer(){
      const healValue = calculateAttackValue(8,20);
      if(this.playerHealth + healValue > 100){
        this.playerHealth = 100;
      }else{
        this.playerHealth += healValue;
      }
      this.addLogMessage('player', 'heal', healValue);
      this.attackPlayer();
    },

    StartNewGame() {
      this.playerHealth = 100;
      this.monsterHealth = 100;
      this.winner = null;
      this.currentRound = 0;
      logMessages = [];
    },

    surrender(){
      this.winner = 'monster'
    },

    addLogMessage(who, what, value){
      this.logMessages.unshift({
        actionBy: who,
        action: what,
        actionValue: value,
      })

    }
  },
  

})

app.mount('#game');