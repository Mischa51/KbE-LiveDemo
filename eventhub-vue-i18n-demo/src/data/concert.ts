/** Source: https://www.uber-arena.de/events/tickets/detail/don-toliver/2026-11-02-2000/ */
export const concert = {
  artist: 'Don Toliver',
  tour: 'NITROUS — OCTANE',
  venue: 'Uber Arena',
  city: 'Berlin',
  // Berlin: UTC+1 on November 2, 2026. ISO UTC timestamps avoid local-time drift.
  start: new Date('2026-11-02T19:00:00.000Z'),
  doors: new Date('2026-11-02T17:30:00.000Z'),
  currency: 'EUR',
  photoPath: '/images/don-toliver-licensed.jpg',
  officialUrl: 'https://www.uber-arena.de/events/tickets/detail/don-toliver/2026-11-02-2000/',
} as const

export const ticketCategories = [
  { id: 'standard', labelKey: 'tickets.standard', detailKey: 'tickets.standardDetail', price: 72 },
  { id: 'club', labelKey: 'tickets.club', detailKey: 'tickets.clubDetail', price: 89 },
  { id: 'premium', labelKey: 'tickets.premium', detailKey: 'tickets.premiumDetail', price: 169 },
] as const

export type TicketCategoryId = (typeof ticketCategories)[number]['id']
export const MAX_TICKETS = 5

export function findCategory(id: TicketCategoryId) {
  return ticketCategories.find((item) => item.id === id) ?? ticketCategories[0]
}

export function calculateTotal(id: TicketCategoryId, quantity: number): number {
  if (!Number.isInteger(quantity) || quantity < 0 || quantity > MAX_TICKETS) {
    throw new RangeError(`Ticket quantity must be an integer between 0 and ${MAX_TICKETS}`)
  }
  return findCategory(id).price * quantity
}
