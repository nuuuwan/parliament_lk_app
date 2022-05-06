const STYLE = {
  position: "absolute",
};

const BORDER_WIDTH = 3;
const STYLE_IMAGE = {
  maxWidth: "100%",
  maxHeight: "100%",
  borderStyle: "solid",
  borderRadius: "100%",
  borderWidth: BORDER_WIDTH,
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
  const { mp, x, y, size } = props;
  const innerSize = size - BORDER_WIDTH * 2;

  const styleCustom = {
    left: x - innerSize / 2 + BORDER_WIDTH,
    top: y - innerSize / 2 + BORDER_WIDTH,
    width: innerSize,
    height: innerSize,
  };

  const styleImageCustom = {
    borderColor: getPartyColor(mp.party),
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
