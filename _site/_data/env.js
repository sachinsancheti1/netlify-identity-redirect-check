module.exports = {
  DEV: process.env.ELEVENTY_ENV !== 'production',
  PRODUCTION: process.env.ELEVENTY_ENV === 'production',
}
