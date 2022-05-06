const SIZE = 40;
const BORDER_WIDTH = SIZE / 15;
const STYLE = {
  margin: 0,
  padding: 0,
};
const STYLE_IMAGE = {
  width: SIZE,
  height: SIZE,
  borderRadius: "100%",
  borderWidth: BORDER_WIDTH,
  borderStyle: "solid",
};

const PARTY_TO_COLOR = {
  SLPP: "maroon",
  SLFP: "blue",
  OPPP: "brown",

  SJB: "green",
  UNP: "green",

  JJB: "red",

  MNA: "darkgreen",
  ACMC: "darkgreen",
  SLMC: "darkgreen",
  NC: "darkgreen",

  TMTK: "yellow",
  ITAK: "yellow",
  EPDP: "yellow",
  AITC: "yellow",
  TMVP: "yellow",
};

function getPartyColor(party) {
  if (PARTY_TO_COLOR[party]) {
    return PARTY_TO_COLOR[party];
  }
  console.warn(party);
  return "black";
}

export default function MPWidget(props) {
  const { mp, onClickMP } = props;
  const styleImageCustom = {
    borderColor: getPartyColor(mp.party),
  };

  const onClick = function (e) {
    onClickMP(mp.id);
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
