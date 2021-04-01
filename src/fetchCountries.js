import createMarkupFunction from './handelbars.hbs'
import countryNames from './countries.hbs'
import _ from 'lodash'
import '@pnotify/core/dist/BrightTheme.css';
import { error } from '@pnotify/core';

const input = document.querySelector('[type="text"]')
const div = document.querySelector('.country')
const basicUrl = 'https://restcountries.eu/rest/v2/name'

function showCountry(name) {
     const markUp = createMarkupFunction(...name)
    return markUp
}
input.addEventListener('input', _.debounce(function (e) {
  e.preventDefault()
  showCountries(input.value)
  if (input.value === 0) {
    clearList()
  }

  }
  
),5000)
function showCountries(name) {
  const countryFetch = fetch(`${basicUrl}/${name}`)
  countryFetch
  .then(response => response.json())
    .then(result => {
      if (result.length > 1 && result.length <= 10) {
        const mark = countryNames(result)
        
      console.log(mark)
      div.insertAdjacentHTML("beforeend",mark)
      } else if (result.length === 1) {
        clearList()
      const country =  showCountry(result)
     div.insertAdjacentHTML("beforeend",country) 
      }else if (result.length > 10) {
        error({
          text: 'Too much matches',
          delay:500
        })
      }
    })
    .catch(err => {
      div.innerHTML = ''
      if (result.length === 0) {
        error({
          text: 'There is no such country',
          delay:1000
        })
      }
  })
}
function clearList() {
  div.innerHTML = ''
}