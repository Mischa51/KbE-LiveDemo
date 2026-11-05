<script setup lang="ts">
import { computed, ref, watch } from 'vue'
import { useI18n } from 'vue-i18n'
import AppHeader from './components/AppHeader.vue'
import ConcertHero from './components/ConcertHero.vue'
import ConcertOverview from './components/ConcertOverview.vue'
import TicketSelector from './components/TicketSelector.vue'
import BookingSummary from './components/BookingSummary.vue'
import BookingConfirmation from './components/BookingConfirmation.vue'
import EventDetails from './components/EventDetails.vue'
import { calculateTotal } from './data/concert'
import type { TicketCategoryId } from './data/concert'

const { t, locale } = useI18n({ useScope: 'global' })
const selectedCategory = ref<TicketCategoryId>('standard')
const quantity = ref(0)
const showConfirmation = ref(false)
const photoLoaded = ref(false)
const total = computed(() => calculateTotal(selectedCategory.value, quantity.value))

watch(locale, (value) => {
  document.documentElement.lang = value
}, { immediate: true })

function resetDemo() {
  showConfirmation.value = false
  selectedCategory.value = 'standard'
  quantity.value = 0
}

function confirmDemo() {
  if (quantity.value > 0) showConfirmation.value = true
}
</script>

<template>
  <div id="top" class="site-shell">
    <AppHeader />
    <main>
      <div class="experience-layout">
        <ConcertHero @photo-status="photoLoaded = $event" />
        <aside class="ticket-panel" :aria-label="t('tickets.sectionLabel')">
          <div class="booking-panel-top">
            <ConcertOverview />
            <p class="panel-section-label">{{ t('tickets.sectionLabel') }}</p>
            <h2 class="panel-headline">{{ t('tickets.headline') }}</h2>
            <p class="panel-subtitle">{{ t('tickets.subheading') }}</p>
          </div>
          <TicketSelector v-model:category="selectedCategory" v-model:quantity="quantity" />
          <BookingSummary :category="selectedCategory" :quantity="quantity" @checkout="confirmDemo" @reset="resetDemo" />
        </aside>
      </div>
      <div class="demo-status"><span class="status-indicator"></span><strong>{{ t('demo.notice') }}</strong><span class="status-separator"></span>{{ t('demo.pastNotice') }}</div>
      <EventDetails />
    </main>
    <footer id="about" class="site-footer">
      <div><span class="footer-wordmark">EVENT<span>HUB</span>.</span><p>{{ t('demo.about') }} {{ t('demo.noCheckout') }}</p><small>{{ t('demo.education') }}</small></div>
      <div class="source-links">
        <a href="https://www.uber-arena.de/events/tickets/detail/don-toliver/2026-11-02-2000/" target="_blank" rel="noopener noreferrer">{{ t('demo.source') }}</a>
        <a v-if="photoLoaded" href="https://commons.wikimedia.org/wiki/File:Don_Toliver_by_Sanchez_Productions.jpg" target="_blank" rel="noopener noreferrer">{{ t('demo.photoCredit') }}</a>
        <span v-else>{{ t('demo.photoPending') }}</span>
      </div>
    </footer>
    <BookingConfirmation
      v-if="showConfirmation"
      :category="selectedCategory"
      :quantity="quantity"
      :total="total"
      @close="showConfirmation = false"
      @restart="resetDemo"
    />
  </div>
</template>
