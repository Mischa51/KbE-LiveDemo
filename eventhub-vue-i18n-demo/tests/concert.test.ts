import { describe, expect, it } from 'vitest'
import { calculateTotal, concert, findCategory, MAX_TICKETS, ticketCategories } from '../src/data/concert'

describe('Official event data and demo ticket calculator', () => {
  it('anchors the concert to Berlin on November 2, 2026', () => {
    expect(concert.start.toISOString()).toBe('2026-11-02T19:00:00.000Z')
    expect(concert.doors.toISOString()).toBe('2026-11-02T17:30:00.000Z')
  })

  it('offers the documented ticket categories', () => {
    expect(ticketCategories.map((category) => category.price)).toEqual([72, 89, 169])
    expect(findCategory('standard').labelKey).toBe('tickets.standard')
  })

  it('calculates total and updates on category changes', () => {
    expect(calculateTotal('standard', 0)).toBe(0)
    expect(calculateTotal('standard', 3)).toBe(216)
    expect(calculateTotal('club', 3)).toBe(267)
    expect(calculateTotal('premium', 2)).toBe(338)
  })

  it('rejects out-of-range and fractional quantities', () => {
    expect(calculateTotal('standard', MAX_TICKETS)).toBe(360)
    expect(() => calculateTotal('standard', -1)).toThrow(RangeError)
    expect(() => calculateTotal('standard', MAX_TICKETS + 1)).toThrow(RangeError)
    expect(() => calculateTotal('standard', 1.5)).toThrow(RangeError)
  })
})
