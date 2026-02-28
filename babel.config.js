////////////////////////////////////////////////////////////////////////////////
//
//    Copyright (c) 2026.
//    Haixing Hu, Qubit Co. Ltd.
//
//    All rights reserved.
//
////////////////////////////////////////////////////////////////////////////////

function getBabelConfig() {
  if (process.env.NODE_ENV === 'test') {    // for Jest testing
    const theTargets = process.env.TARGETS ? process.env.TARGETS : 'defaults';
    const config = {
      presets: ['@babel/preset-env'],
      targets: theTargets,
    };
    console.log('Jest with babel configuration:', config);
    return config;
  } else {                 // for library building
    return {
      presets: ['@babel/preset-env'],
      targets: 'fully supports es5',
    };
  }
}

module.exports = getBabelConfig();
