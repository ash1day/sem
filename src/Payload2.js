export let payload2 = {
  nobs: 33,
  obs_names: ['vab', 'vp', 'vaba', 'vabp'],
  cov: [
    [4240],
    [860,2760],
    [1800,-690, 5940],
    [590,-50,520,1460]
  ],
  model: {
    latent_variable: {
      nan: ['vaba', 'vabp']
    },
    regression: {
      nan: ['vab', 'vp']
    },
    covariance: {
      vab: ['vp']
    }
  }
}
