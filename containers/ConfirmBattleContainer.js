var React = require('react');
var ConfirmBattle = require('../components/ConfirmBattle');
var githubHelpers = require('../utils/githubHelpers');

var ConfirmBattleContainer = React.createClass({
  contextTypes: {
    router: React.PropTypes.object.isRequired
  },
  getInitialState: function () {
    return {
      isLoading: true,
      playersInfo: []
    }
  },
  componentDidMount: function () {
    var query = this.props.location.query;
    // keep context of this that same as outter function, remember the context of this changes in JS from function to function
    var that = this;
    githubHelpers.getPlayersInfo([query.playerOne, query.playerTwo])
      .then(function (players) {
        that.setState({
          isLoading: false,
          playersInfo: [players[0], players[1]]
        })
      })
  },
  render: function () {
    return (
      <ConfirmBattle 
        isLoading={this.state.isLoading} 
        playersInfo={this.state.playersInfo} />
    );
  }
});

module.exports = ConfirmBattleContainer;