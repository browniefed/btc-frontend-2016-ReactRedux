import React, {Component, PropTypes} from 'react';
import {connect} from 'react-redux';
import DataMap from '../../components/Visuals/DataMap.jsx';
import statesData from '../../data/statesData';
import StoryCard from '../../components/StoryCards/StoryCard.jsx';
import {loadStateInfo} from '../../actions'

function loadData(props) {
  const {filer_id} = props.params;
  props.loadStateInfo(filer_id);
}

class ResultLocationStoryCard extends Component {

  constructor(props, content) {
    super(props, content);
  }

  componentWillMount() {
    loadData(this.props);
  }

  render() {
    let stateContribs;
    const {stateContributions} = this.props;
    stateContribs = stateContributions;
    // let stateArray = _.values(stateContributions)
    let stateArr = [];
    statesData.forEach((item) => {
      if(stateContribs && stateContribs[item.regionName]){
          console.log(stateContribs[item.regionName])
          item.value = stateContribs[item.regionName].value;
          stateArr.push(item);
      }
    })
    console.log(stateArr);

    // var stateDataArr = statesData.map((i) => {
    //   if (stateContribs && stateContribs[i.regionName] !== undefined) {
    //     // console.log(stateContribs[i.regionName]);
    //     return {
    //       code: i.code,
    //       regionName: i.regionName,
    //       value: stateContribs[i.regionName].value
    //     }
    //   }
    //
    // });
    // console.log(stateDataArr);

  return (
    <div>
      <StoryCard style={{
        minHeight: '400px',
        minWidth: '600px'
      }} question={"Where does the money come from?"} description={"Money spent in Oregon is raised all across the country. This graphic demonstrates the magnitude of money spent in Oregon by state of origin."}>
        <DataMap {...this.props} regionData={stateArr}/>
      </StoryCard>
    </div>
  );
}
}

ResultLocationStoryCard.propTypes = {
contributions: PropTypes.object
}

function mapStateToProps(state) {
const {entities: {
    stateContributions
  }} = state;
return {stateContributions};
}

// export default ResultLocationStoryCard;
export default connect(mapStateToProps, {loadStateInfo})(ResultLocationStoryCard);
