<script setup lang="ts">
import { nextTick, onMounted, onUnmounted, ref } from 'vue'
import { useI18n } from 'vue-i18n'
import { Check, X, ArrowUpRight } from 'lucide-vue-next'
import LanguageSwitcher from './LanguageSwitcher.vue'
import { concert, findCategory } from '../data/concert'
import type { TicketCategoryId } from '../data/concert'

const props = defineProps<{ category: TicketCategoryId; quantity: number; total: number }>()
const emit = defineEmits<{ close: []; restart: [] }>()
const { t, n } = useI18n({ useScope: 'global' })
const titleRef = ref<HTMLElement | null>(null)
const category = () => findCategory(props.category)
const previousFocus = document.activeElement instanceof HTMLElement ? document.activeElement : null

onMounted(async () => {
  await nextTick()
  titleRef.value?.focus()
  document.addEventListener('keydown', handleKeys)
})

onUnmounted(() => {
  document.removeEventListener('keydown', handleKeys)
  previousFocus?.focus()
})

function handleKeys(event: KeyboardEvent) {
  if (event.key === 'Escape') emit('close')
  if (event.key !== 'Tab') return
  const dialog = titleRef.value?.closest('[role="dialog"]')
  if (!dialog) return
  const focusable = Array.from(dialog.querySelectorAll<HTMLElement>('button:not(:disabled), a[href]'))
  const first = focusable[0]
  const last = focusable[focusable.length - 1]
  if (!first || !last) return
  if (event.shiftKey && document.activeElement === first) { event.preventDefault(); last.focus() }
  else if (!event.shiftKey && document.activeElement === last) { event.preventDefault(); first.focus() }
}
</script>

<template>
  <div class="modal-backdrop" @click.self="emit('close')">
    <section class="confirmation-modal" role="dialog" aria-modal="true" aria-labelledby="confirmation-title" aria-describedby="confirmation-description">
      <div class="modal-topline">
        <span class="modal-id">EVENTHUB / DEMO</span>
        <div class="modal-actions">
          <LanguageSwitcher />
          <button type="button" class="modal-close" :aria-label="t('booking.closeLabel')" @click="emit('close')"><X :size="20" /></button>
        </div>
      </div>
      <div class="confirmation-icon"><Check :size="30" :stroke-width="2.6" /></div>
      <p class="modal-eyebrow">{{ t('booking.eyebrow') }}</p>
      <h2 id="confirmation-title" ref="titleRef" tabindex="-1">{{ t('booking.title') }}<span>.</span></h2>
      <p id="confirmation-description" class="confirmation-message" role="status">{{ t('booking.confirmation') }}</p>
      <p class="confirmation-detail">{{ t('booking.message', { artist: concert.artist }) }}</p>
      <dl class="confirmation-receipt">
        <div><dt>{{ t('booking.category') }}</dt><dd>{{ t(category().labelKey) }}</dd></div>
        <div><dt>{{ t('booking.tickets') }}</dt><dd>{{ quantity }}</dd></div>
        <div class="receipt-total"><dt>{{ t('booking.total') }}</dt><dd>{{ n(total, 'euro') }}</dd></div>
      </dl>
      <button class="checkout-button modal-restart" type="button" @click="emit('restart')">{{ t('booking.restart') }} <ArrowUpRight :size="19" /></button>
      <button type="button" class="modal-secondary" @click="emit('close')">{{ t('booking.close') }}</button>
    </section>
  </div>
</template>
