const initialGameState = {
  //must import player no from props
  playerNo: "",
  status: true,
  kitty: {},
  playerCards: [],
  playedCards: {},
  gameUpdate: {
    gameTelop: "",
    dealer: "",
    trump: "",
    orderedPlayer: "",
    team1Score: 0,
    team2Score: 0,
    team1Tricks: "",
    team2Tricks: "",
  },
  showHand: false,
  showKitty: false,
  showTelop: false,
  showBoard: false,
  showStartButton: true,
  currentPlayer: "",
};

export default initialGameState;
