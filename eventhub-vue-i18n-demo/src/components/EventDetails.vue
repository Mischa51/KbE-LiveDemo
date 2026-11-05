<script setup lang="ts">
import { ref } from 'vue'
import { useI18n } from 'vue-i18n'
import { CalendarDays, Clock3, MapPin, ArrowUpRight, ChevronsUpDown } from 'lucide-vue-next'
import { concert } from '../data/concert'

const { t, d, n } = useI18n({ useScope: 'global' })
const showFormats = ref(false)
</script>

<template>
  <section id="details" class="details-section" aria-labelledby="details-heading">
    <div class="details-intro">
      <p class="section-number">02 / {{ t('concerts.eventDetails') }}</p>
      <h2 id="details-heading">{{ t('concerts.eventDetails') }}<span>.</span></h2>
      <p>{{ t('concerts.detailsIntro') }}</p>
    </div>
    <div class="detail-grid">
      <div class="detail-item"><CalendarDays :size="22" aria-hidden="true" /><span>{{ t('concerts.date') }}</span><strong>{{ d(concert.start, 'short') }}</strong></div>
      <div class="detail-item"><Clock3 :size="22" aria-hidden="true" /><span>{{ t('concerts.doors') }} / {{ t('concerts.showtime') }}</span><strong>{{ d(concert.doors, 'time') }} / {{ d(concert.start, 'time') }}</strong></div>
      <div class="detail-item"><MapPin :size="22" aria-hidden="true" /><span>{{ t('concerts.venue') }}</span><strong>{{ concert.venue }}, {{ concert.city }}</strong></div>
      <div class="detail-item"><ArrowUpRight :size="22" aria-hidden="true" /><span>{{ t('tickets.priceFrom') }}</span><strong>{{ n(72, 'euro') }}</strong></div>
    </div>
    <div class="format-comparison">
      <button type="button" class="format-toggle" :aria-expanded="showFormats" aria-controls="format-panel" @click="showFormats = !showFormats">
        {{ showFormats ? t('demo.formatClose') : t('demo.formatToggle') }} <ChevronsUpDown :size="18" aria-hidden="true" />
      </button>
      <div v-show="showFormats" id="format-panel" class="format-panel">
        <p>{{ t('demo.formatHint') }}</p>
        <dl>
          <div><dt>{{ t('demo.dateDemo') }} <code>d(eventDate, 'short')</code></dt><dd>{{ d(concert.start, 'short') }}</dd></div>
          <div><dt>{{ t('demo.numberDemo') }} <code>n(72, 'decimal')</code></dt><dd>{{ n(72, 'decimal') }}</dd></div>
          <div><dt>{{ t('demo.currencyDemo') }} <code>n(72, 'euro')</code></dt><dd>{{ n(72, 'euro') }}</dd></div>
        </dl>
      </div>
    </div>
  </section>
</template>
