import React from 'react'
import { connect } from 'react-redux'

import { viewCabal, changeScreen } from '../actions'

const mapStateToProps = state => {
  var cabal = state.cabals[state.currentCabal]
  return {
    addr: state.currentCabal,
    cabals: state.cabals,
    cabal,
    username: cabal.username
  }
}

const mapDispatchToProps = dispatch => ({
  changeScreen: ({screen}) => dispatch(changeScreen({screen})),
  viewCabal: ({addr}) => dispatch(viewCabal({addr}))
})

class CabalsListScreen extends React.Component {
  joinCabal () {
    this.props.changeScreen({screen: 'addCabal'})
  }

  openSettings () {
    this.props.changeScreen({screen: 'appSettings'})
  }

  selectCabal (addr) {
    this.props.viewCabal({addr})
  }

  render () {
    var self = this
    const { addr, cabals } = this.props
    var cabalKeys = Object.keys(cabals).sort()
    return (
      <div className='client__cabals' onClick={(e) => this.props.toggleEmojis(false)}>
        <div className='switcher'>
          {cabalKeys.map(function (key) {
            var cabal = cabals[key]
            return (
              <div key={key} onClick={self.selectCabal.bind(self, key)} className={addr === cabal.addr ? 'switcher__item switcher__item--active' : 'switcher__item'}>
                <span>
                  {cabal.addr.slice(0, 2)}
                </span>
              </div>
            )
          })}
          <div className='switcher__item --addnew' onClick={self.joinCabal.bind(self)}>
            <img src='static/images/icon-newchannel.svg' />
          </div>
        </div>
        <div className='client__cabals__footer'>
          <div className='switcher__item settingsButton' onClick={self.openSettings.bind(self)}>
            ⚙ ️
          </div>
        </div>
      </div>
    )
  }
}

const CabalsList = connect(mapStateToProps, mapDispatchToProps)(CabalsListScreen)

export default CabalsList
