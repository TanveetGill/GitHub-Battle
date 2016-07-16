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
  handleInitiateBattle: function () {
    this.context.router.push({
      pathname: '/results',
      state: {
        playersInfo: this.state.playersInfo
      }
    })
  },
  render: function () {
    return (
      <ConfirmBattle 
        isLoading={this.state.isLoading} 
        onInitiateBattle={this.handleInitiateBattle} 
        playersInfo={this.state.playersInfo} />
    );
  }
});

module.exports = ConfirmBattleContainer;