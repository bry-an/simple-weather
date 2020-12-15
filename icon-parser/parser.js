const puppeteer = require('puppeteer')
const fs = require('fs')
const path = require('path')

const genIcons = () => {
  const s = {}
  s.ICON_ROW = '.module__items.align-days'
  s.ICONS = '.module__items-item.js-forecast-module-item.align-days__item'
  for (let i = 1; i < 9; i += 1) {
    s['ICON_' + i] = s.ICONS + ':nth-child(' + i + ')' + ' > img.module__items-icon'
  }
  return s
}

if (!fs.readdirSync(__dirname).includes('icons.csv')) {
  fs.writeFileSync(path.join(__dirname, 'icons.csv'), '', { encoding: 'utf-8' })
}
const cities = fs
  .readFileSync(path.join(__dirname, 'cityList.csv'), { encoding: 'utf-8' })
  .split(';')

const s = genIcons()

const parseCity = async (browser, cityName) => {
  const list = fs
    .readFileSync(path.join(__dirname, 'icons.csv'), { encoding: 'utf-8' })
    .split('\n')
  const page = await browser.newPage()
  await page.goto(`https://duckduckgo.com/?q=${'weather ' + cityName}`)

  for (let i = 1; i < 9; i += 1) {
    await page.waitForSelector(s['ICON_' + i])
    const src = await page.$eval(s['ICON_' + i], (el) => el.src)
    const iconName = src.match(/\/([a-z,-]+\.svg)$/i)[1]
    if (!list.includes(iconName)) list.push(iconName)
  }
  fs.writeFileSync(path.join(__dirname, 'icons.csv'), list.join('\n'), {
    encoding: 'utf-8'
  })
  await page.close()
}

;(async () => {
  const browser = await puppeteer.launch({ headless: false })
  const now = Date.now()
  for (const city of cities) {
    try {
      console.log('Parsing icons for city: ' + city)
      await parseCity(browser, city)
      console.log('Success')
    } catch (err) {
      console.log('Error')
      console.log(city)
      console.log(err)
    }
  }
  console.log('\n\n\nTask done!\n\n\nTook: ' + (Date.now() - now) / 1000 + 'seconds.')
  await browser.close()
})()
