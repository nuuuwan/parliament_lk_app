const SIZE = 40;
const BORDER_WIDTH = SIZE / 20;
const STYLE = {
  margin: 0,
  padding: 0,
};
const STYLE_IMAGE = {
  maxWidth: SIZE,
  maxHeight: SIZE,
  borderRadius: "100%",
  borderWidth: BORDER_WIDTH,
  borderStyle: "solid",
};

const PARTY_TO_COLOR = {
  "Sri Lanka Podujana Peramuna (SLPP)": "maroon",
  "Sri Lanka Freedom Party(SLFP)": "blue",
  "Our Power of People Party (OPPP)": "brown",

  "Samagi Jana Balawegaya (SJB)": "green",
  "United National Party (UNP)": "green",

  "Jathika Jana balawegaya (JJB)": "red",

  "Muslim National Alliance (MNA)": "darkgreen",
  "All Ceylon Makkal Congress (ACMC)": "darkgreen",
  "Sri Lanka Muslim Congress (SLMC)": "darkgreen",
  "National Congress (NC)": "darkgreen",

  "Thamil Makkal Thesiya Kuttani (TMTK)": "yellow",
  "Illankai Tamil Arasu Kadchi (ITAK)": "yellow",
  "Eelam People's Democratic Party (EPDP)": "yellow",
  "Ahila Ilankai Thamil Congress (AITC)": "yellow",
  "Thamil Makkal Viduthalai Pulikal (TMVP)": "yellow",
};

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

  const onClick = function(e) {
    alert(JSON.stringify(mp.d));
  };

  return (
    <span style={STYLE}>
      <img
        src={mp.imageURL}
        alt={mp.name}
        style={{ ...STYLE_IMAGE, ...styleImageCustom }}
        onClick={onClick}
      />
    </span>
  );
}
