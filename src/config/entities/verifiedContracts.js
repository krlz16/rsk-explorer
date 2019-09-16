export const externalLibraries = {
  fields: {},
  formatFields: (fields, data) => {
    for (let fieldName in data) {
      fields[fieldName] = { type: 'address', trim: 'auto' }
    }
    return fields
  }
}

export const compilationSettings = {
  fields: {
    contractName: null,
    compilerVersion: null,
    evmVersion: null,
    optimization: null
  }
}
