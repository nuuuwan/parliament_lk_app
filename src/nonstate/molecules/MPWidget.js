const STYLE = {
  position: "absolute",
};

const STYLE_IMAGE = {
  maxWidth: "100%",
  maxHeight: "100%",
  borderStyle: "solid",
  borderRadius: "100%",
  borderWidth: 3,
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

  const styleCustom = {
    left: x - size / 2,
    top: y - size / 2,
    width: size,
    height: size,
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
