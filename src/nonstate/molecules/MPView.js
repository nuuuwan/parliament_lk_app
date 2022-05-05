const SIZE = 100;

const STYLE = {
  height: SIZE,
  width: SIZE,
};

const STYLE_IMAGE = {
  borderRadius: SIZE,
  borderStyle: 'solid',
  borderWidth: 10,
  height: SIZE,
  width: SIZE,
};

const STYLE_LABEL = {
  width: "50%",
};

const PARTY_TO_COLOR = {
  'Sri Lanka Podujana Peramuna (SLPP)': 'maroon',
  'Sri Lanka Freedom Party(SLFP)': 'blue',

  'Samagi Jana Balawegaya (SJB)': 'green',

  'Jathika Jana balawegaya (JJB)': 'red',

  'Muslim National Alliance (MNA)': 'darkgreen',
  'National Congress (NC)':  'darkgreen',
  'Thamil Makkal Thesiya Kuttani (TMTK)': 'yellow',
  'Illankai Tamil Arasu Kadchi (ITAK)': 'yellow',
  'Eelam People\'s Democratic Party (EPDP)': 'yellow',
  'Ahila Ilankai Thamil Congress (AITC)': 'yellow',
}

function getPartyColor(party) {
  if (PARTY_TO_COLOR[party]) {
    return PARTY_TO_COLOR[party];
  }
  console.warn(party);
  return 'black';
}


export default function MPView(props) {
  const { mp } = props;
  const styleImageCustom = {
    borderColor: getPartyColor(mp.party),
  }
  return (
    <div style={STYLE}>
      <img
        src={mp.imageURL}
        alt={mp.name}
        style={{...STYLE_IMAGE, ...styleImageCustom}}
      />
    </div>
  );
}
