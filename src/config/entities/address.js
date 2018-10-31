import { ROUTES as r } from '../types'
import { tokenAmount } from '../../filters/TokensFilters'

const addressFormatRow = (data, parentData) => {
  data._totalSupplyResult = totalSupplyField(data)
  let decimals = data.decimals
  data.decimals = (decimals && decimals !== '0x0') ? decimals : null
  return data
}

const Addresses = () => {
  return {
    icon: 'credit-card',
    key: 'address',
    link: `/${r.address}`,
    listLink: `/${r.addresses}`,
    fields: {
      address: null,
      balance: {
        filters: ['tx-value', 'round', 'rbtc'],
        default: 0
      },
      type: null
    }
  }
}
// type

const Address = () => {
  let address = Addresses()
  address.formatRow = addressFormatRow
  let fields = Object.assign(address.fields, {
    address: {
      trim: 'auto'
    },
    contractInterfaces: {
      icon: 'link-external',
      hideIfEmpty: true,
      css: ['items-list', 'small', 'soft'],
      titleIcon: true,
      hideTitle: true
    },
    creationDate: {
      field: 'createdByTx.timestamp',
      type: 'date',
      hideIfEmpty: true
    },
    created: {
      field: 'createdByTx.timestamp',
      type: 'timestamp',
      hideIfEmpty: true
    },
    tx: {
      field: 'createdByTx.hash',
      type: 'transaction',
      hideIfEmpty: true,
      trim: 'auto'
    },
    decimals: {
      filters: ['big-number'],
      default: '',
      hideIfEmpty: true
    },
    totalSupply: {
      field: '_totalSupplyResult',
      filters: ['big-number'],
      default: '',
      hideIfEmpty: true
    }

  })
  address.fields = Object.assign({
    name: {
      type: 'tokenName',
      hideIfEmpty: true
    },
    symbol: {
      hideIfEmpty: true
    }
  }, fields)
  address.fields.balance.filters = ['tx-value', 'rbtc']
  return address
}

export const address = Address()
export const addresses = Addresses()

export const totalSupplyField = data => {
  let totalSupply = data.totalSupply
  let decimals = data.decimals
  if ((totalSupply && totalSupply !== '0x0') && decimals) {
    return tokenAmount(totalSupply, decimals)
  }
  return null
}
