const SIZE = 40;
const [WIDTH, HEIGHT] = [window.innerWidth, window.innerHeight];

const STYLE = {
  position: "absolute",
  height: SIZE,
  width: SIZE,
};

const STYLE_IMAGE = {
  borderRadius: SIZE,
  borderStyle: "solid",
  borderWidth: SIZE * 0.1,
  height: SIZE,
  width: SIZE,
};

const PARTY_TO_COLOR = {
  "Sri Lanka Podujana Peramuna (SLPP)": "maroon",
  "Sri Lanka Freedom Party(SLFP)": "blue",

  "Samagi Jana Balawegaya (SJB)": "green",

  "Jathika Jana balawegaya (JJB)": "red",

  "Muslim National Alliance (MNA)": "darkgreen",
  "National Congress (NC)": "darkgreen",
  "Thamil Makkal Thesiya Kuttani (TMTK)": "yellow",
  "Illankai Tamil Arasu Kadchi (ITAK)": "yellow",
  "Eelam People's Democratic Party (EPDP)": "yellow",
  "Ahila Ilankai Thamil Congress (AITC)": "yellow",
};

function getRandomX() {
  return parseInt((Math.random() * WIDTH) / SIZE) * SIZE;
}

function getRandomY() {
  return parseInt((Math.random() * HEIGHT) / SIZE) * SIZE;
}

function getPartyColor(party) {
  if (PARTY_TO_COLOR[party]) {
    return PARTY_TO_COLOR[party];
  }
  console.warn(party);
  return "black";
}

export default function MPWidget(props) {
  const { mp } = props;
  const styleImageCustom = {
    borderColor: getPartyColor(mp.party),
  };

  const styleCustom = {
    top: getRandomY(),
    left: getRandomX(),
  };
  return (
    <div style={{ ...STYLE, ...styleCustom }}>
      <img
        src={mp.imageURL}
        alt={mp.name}
        style={{ ...STYLE_IMAGE, ...styleImageCustom }}
      />
    </div>
  );
}
