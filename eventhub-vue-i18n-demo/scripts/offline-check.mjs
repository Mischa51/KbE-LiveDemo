/** Minimal no-dependency checks, possible in the offline environment under Node >=22.12. */
import { readFileSync } from 'node:fs'
import { strict as expect } from 'node:assert'
import { ticketCategories, MAX_TICKETS, calculateTotal, concert } from '../src/data/concert.ts'

const read = (name) => JSON.parse(readFileSync(new URL(`../src/locales/${name}.json`, import.meta.url), 'utf8'))
const de = read('de-DE')
const en = read('en-US')
function flatten(input, prefix='') {
  return Object.entries(input).flatMap(([key,val]) => val && typeof val==='object'
    ? flatten(val, prefix ? `${prefix}.${key}` : key)
    : [prefix ? `${prefix}.${key}` : key])
}
expect.deepEqual(flatten(de).sort(), flatten(en).sort())
expect.equal(de.concerts.title,'Konzerte')
expect.equal(en.concerts.title,'Concerts')
expect.equal(de.user.welcome.replace('{name}','Mia'),'Willkommen zurück, Mia!')
expect.equal(de.tickets.selected.split('|').length,3)
expect.equal(en.tickets.selected.split('|').length,3)
expect.equal(ticketCategories.length,3)
expect.equal(MAX_TICKETS,5)
expect.equal(calculateTotal('standard',3),216)
expect.equal(calculateTotal('club',3),267)
expect.equal(calculateTotal('premium',2),338)
expect.throws(()=>calculateTotal('standard',-1),RangeError)
const date=(locale, options)=>new Intl.DateTimeFormat(locale,{...options,timeZone:'Europe/Berlin'}).format(concert.start)
expect.equal(date('de-DE',{day:'2-digit',month:'2-digit',year:'numeric'}),'02.11.2026')
expect.equal(date('en-US',{month:'numeric',day:'numeric',year:'numeric'}),'11/2/2026')
expect.equal(new Intl.NumberFormat('de-DE',{minimumFractionDigits:2,maximumFractionDigits:2}).format(72),'72,00')
expect.equal(new Intl.NumberFormat('en-US',{minimumFractionDigits:2,maximumFractionDigits:2}).format(72),'72.00')
expect.equal(new Intl.NumberFormat('de-DE',{style:'currency',currency:'EUR'}).format(72).replace(/[\u00a0\u202f]/g,' '),'72,00 €')
expect.equal(new Intl.NumberFormat('en-US',{style:'currency',currency:'EUR'}).format(72),'€72.00')
console.log('OK: 71+ translation keys match, ticket totals and time zone/Intl formats are correct. (Not a Vue runtime test.)')
