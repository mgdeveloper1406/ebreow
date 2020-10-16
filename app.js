// TODO: point/streak counter
// TODO: difficulty level switching
//    easy - three choices
//    medium - two choices
//    hard - no choices
// TODO: TIMER MODE

// Init Dropdown Menus
let dropdowns = document.querySelectorAll('.dropdown-trigger');
dropdowns.forEach(el => {
  M.Dropdown.init(el);
});

const state = {
  focus: 'Name',
  difficulty: 'Easy',
  streak: 0,
  maxStreak: 0,
  correctAnswer: '',
}
document.getElementById('streak').innerText = state.streak;
document.getElementById('max-streak').innerText = state.maxStreak;

const alphabet = [
  { name: 'Aleph', pronounced: 'Silent', transliteration: `' (or none)`, html: '&#1488;' },
  { name: 'Bet', pronounced: '<b>B</b>oy', transliteration: 'B', html: '&#64305;' },
  { name: 'Vet', pronounced: '<b>V</b>ine', transliteration: 'V', html: '&#1489;' },
  { name: 'Gimmel', pronounced: '<b>G</b>irl', transliteration: 'G', html: '&#1490;' },
  { name: 'Dalet', pronounced: '<b>D</b>oor', transliteration: 'D', html: '&#1491;' },
  { name: 'Hey', pronounced: '<b>H</b>ay', transliteration: 'H', html: '&#1492;' },
  { name: 'Vav', pronounced: '<b>V</b>ine', transliteration: 'V', html: '&#1493;' },
  { name: 'Zayin', pronounced: '<b>Z</b>ebra', transliteration: 'Z', html: '&#1494;' },
  { name: 'Chet', pronounced: 'Ba<b>ch</b>', transliteration: 'CH', html: '&#1495;' },
  { name: 'Tet', pronounced: '<b>T</b>ime', transliteration: 'T', html: '&#1496;' },
  { name: 'Yod', pronounced: '<b>Y</b>es', transliteration: 'Y', html: '&#1497;' },
  { name: 'Kaf', pronounced: '<b>K</b>ite', transliteration: 'K', html: '&#64315;' },
  { name: 'Khaf', pronounced: 'Ba<b>ch</b>', transliteration: 'CH', html: '&#1499;' },
  // { name: 'Kaf (Sofit Form)', pronounced: 'None', transliteration: 'Sofit Form', html: '&#1498;' },
  { name: 'Lamed', pronounced: '<b>L</b>ook', transliteration: 'L', html: '&#1500;' },
  { name: 'Mem', pronounced: '<b>M</b>om', transliteration: 'M', html: '&#1502;' },
  // { name: 'Mem (Sofit Form)', pronounced: 'None', transliteration: 'Sofit Form', html: '&#1501;' },
  { name: 'Nun', pronounced: '<b>N</b>ow', transliteration: 'N', html: '&#1504;' },
  // { name: 'Nun (Sofit Form)', pronounced: 'None', transliteration: 'Sofit Form', html: '&#1503;' },
  { name: 'Samekh', pronounced: '<b>S</b>on', transliteration: 'S', html: '&#1505;' },
  { name: `'Ayin`, pronounced: 'Silent', transliteration: `' (or none)`, html: '&#1506;' },
  { name: 'Pey', pronounced: '<b>P</b>ark', transliteration: 'P', html: '&#64324;' },
  { name: 'Fey', pronounced: '<b>Ph</b>one', transliteration: 'Ph/F', html: '&#1508;' },
  // { name: 'Fey (Sofit Form)', pronounced: 'None', transliteration: 'Sofit Form', html: '&#1507;' },
  { name: 'Tsade', pronounced: 'Nu<b>ts</b>', transliteration: 'Ts', html: '&#1510;' },
  // { name: 'Tsade (Sofit Form)', pronounced: 'None', transliteration: 'Sofit Form', html: '&#1509;' },
  { name: 'Qof', pronounced: '<b>Q</b>ueen', transliteration: 'Q/K', html: '&#1511;' },
  { name: 'Resh', pronounced: '<b>R</b>ain', transliteration: 'R', html: '&#1512;' },
  { name: 'Shin', pronounced: '<b>Sh</b>y', transliteration: 'Sh', html: '&#64298;' },
  { name: 'Sin', pronounced: '<b>S</b>un', transliteration: 'S', html: '&#64299;' },
  { name: 'Tav', pronounced: '<b>T</b>all', transliteration: 'T', html: '&#1514;' }
];

const getRandomInt = (min, max) => {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min) + min); //The maximum is exclusive and the minimum is inclusive
}

const choiceSelected = (e) => {
  let selected = e.target.innerText;
  console.log(selected.toLowerCase());
  console.log(state.correctAnswer.toLowerCase());
  if (selected.toLowerCase() == state.correctAnswer.toLowerCase()) {
    state.streak += 1;
    if (state.streak > state.maxStreak) {
      state.maxStreak = state.streak
    }
  } else {
    state.streak = 0;
  }
  document.getElementById('streak').innerText = state.streak;
  document.getElementById('max-streak').innerText = state.maxStreak;
  document.getElementById('button-div').innerHTML = '';
  loadLetter();
}

const shuffle = (array) => {
  var currentIndex = array.length, temporaryValue, randomIndex;

  // While there remain elements to shuffle...
  while (0 !== currentIndex) {

    // Pick a remaining element...
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;

    // And swap it with the current element.
    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }

  return array;
}


const loadLetter = () => {
  let random = getRandomInt(0, alphabet.length);
  let html = alphabet[random]['html'];
  let name = alphabet[random]['name'];
  state.correctAnswer = name;
  let pronounced = alphabet[random]['pronounced'];
  let transliteration = alphabet[random]['transliteration'];
  if (state.difficulty != 'Easy') {
    document.getElementById('hints').hidden = true;
  }
  document.getElementById('letter').innerHTML = html;
  document.getElementById('pronounciation-input').innerHTML = pronounced;
  document.getElementById('transliteration-input').innerHTML = transliteration;
  let choices = [name];
  while (choices.length < 3) {
    let randomWrong = getRandomInt(0, alphabet.length);
    if (randomWrong != random) {
      choices.push(alphabet[randomWrong]['name']);
    }
  }
  let buttonDiv = document.getElementById('button-div');
  let shuffledChoices = shuffle(choices);
  shuffledChoices.forEach(el => {
    let a = document.createElement('a')
    a.classList = "waves-effect waves-light btn two-per-row";
    a.innerText = el;
    buttonDiv.appendChild(a);
    a.addEventListener('click', choiceSelected);
  })
}



loadLetter();