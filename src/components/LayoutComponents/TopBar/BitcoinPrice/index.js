import React from 'react'
import { Line } from 'peity-react'
import { FormattedMessage } from 'react-intl'
import style from './style.module.scss'

class BitcoinPrice extends React.Component {
  state = {
    chartsData: [5, 3, 9, 6, 5, 9, 7, 3, 5, 2],
  }

  render() {
    const { chartsData } = this.state
    return (
      <div className={style.bitcoinPrice}>
        Dolar:
        <span style={{ margin: '0 8px', position: 'relative', top: '3px' }}>
          <Line values={chartsData} />
        </span>
        6,02 ₺
      </div>
    )
  }
}

export default BitcoinPrice
