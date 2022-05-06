import DataStructuresFuture from "../../base/DataStructuresFuture.js";
import { Component } from "react";
import MP from "../../core/MP.js";
import MPWidget from "../../nonstate/molecules/MPWidget.js";
import GridView from "../../nonstate/molecules/GridView.js";

function funcCategorizeMPByParty(mp) {
  return mp.party;
}

function categorizeMPs(mpIdx, funcCategorizeMP) {
  return Object.values(mpIdx)
    .sort(function (mpA, mpB) {
      return mpA.age - mpB.age;
    })
    .reduce(function (categoryTompIds, mp) {
      const category = funcCategorizeMP(mp);
      if (!categoryTompIds[category]) {
        categoryTompIds[category] = [];
      }
      categoryTompIds[category].push(mp.id);
      return categoryTompIds;
    }, {});
}

export default class ParliamentView extends Component {
  constructor(props) {
    super(props);
    this.state = { mpIdx: undefined };
  }

  async componentDidMount() {
    const mpIdx = await MP.getMPIdx();
    this.setState({ mpIdx });
  }

  render() {
    const { mpIdx } = this.state;
    if (mpIdx === undefined) {
      return "Loading...";
    }

    const categoryTompIds = categorizeMPs(mpIdx, funcCategorizeMPByParty);
    const nX = Object.keys(categoryTompIds).length;
    const nY = 1;

    const categoryList = Object.keys(categoryTompIds).sort();
    const cells = categoryList.reduce(
      function (cells, category, iCategory) {
        const mpIds = categoryTompIds[category];
        return mpIds.reduce(function (cells, mpId) {
          const cellContent = <MPWidget mp={mpIdx[mpId]} />;
          cells[iCategory][0].push(cellContent);
          return cells;
        }, cells);
      },
      DataStructuresFuture.initArray2D(nX, nY, (iX, iY) => [])
    );

    return <GridView cells={cells} xAxisLabels={categoryList} />;
  }
}
