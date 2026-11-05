<script setup lang="ts">
import { ref } from 'vue'
import { useI18n } from 'vue-i18n'
import { ArrowDownRight, CalendarDays, MapPin, Clock3 } from 'lucide-vue-next'
import { concert } from '../data/concert'

const { t, d, n } = useI18n({ useScope: 'global' })
const photoLoaded = ref(false)
// Generated asset is opt-in: no request/404 is made for a missing photograph.
const photoEnabled = import.meta.env.VITE_PHOTO_ENABLED === 'true'

defineEmits<{ photoStatus: [loaded: boolean] }>()
</script>

<template>
  <section class="concert-hero" aria-labelledby="hero-artist">
    <div class="hero-atmosphere" aria-hidden="true">
      <div class="light-beam beam-one"></div>
      <div class="light-beam beam-two"></div>
      <div class="stage-disc disc-one"></div>
      <div class="stage-disc disc-two"></div>
    </div>
    <img
      v-if="photoEnabled"
      class="artist-photo"
      :class="{ visible: photoLoaded }"
      :src="concert.photoPath"
      :alt="t('concerts.heroAlt')"
      fetchpriority="high"
      @load="photoLoaded = true; $emit('photoStatus', true)"
      @error="photoLoaded = false; $emit('photoStatus', false)"
    />
    <div class="hero-shade" aria-hidden="true"></div>

    <div class="hero-content">
      <div class="hero-topline">
        <span class="hero-edition"><span class="tiny-orange-dot"></span> EVENTHUB PRESENTS <span class="slash">/</span> 2026</span>
        <span class="past-pill"><span class="outline-dot"></span>{{ t('concerts.pastEvent') }}</span>
      </div>

      <div class="hero-center">
        <p class="hero-overline">{{ t('concerts.eyebrow') }} <span class="overline-line"></span> 02 NOV 2026</p>
        <h1 id="hero-artist" class="hero-title"><span>DON</span><span>TOLIVER<span class="orange-period">.</span></span></h1>
        <p class="tour-line">NITROUS <span class="tour-divider">/</span> OCTANE</p>
        <p class="tour-subline">WORLD TOUR <span>—</span> LEG 2</p>
      </div>

      <div class="hero-bottom">
        <div class="event-meta">
          <span><CalendarDays :size="18" aria-hidden="true" /> {{ d(concert.start, 'short') }}</span>
          <span><MapPin :size="18" aria-hidden="true" /> {{ concert.venue }} · {{ concert.city }}</span>
          <span><Clock3 :size="18" aria-hidden="true" /> {{ d(concert.start, 'time') }}</span>
        </div>
        <a href="#details" class="hero-scroll">
          <span>{{ t('concerts.moreInfo') }}</span>
          <ArrowDownRight :size="19" aria-hidden="true" />
        </a>
      </div>
    </div>

    <div class="hero-side-caption" aria-hidden="true">EH—2026 / BERLIN</div>
    <span class="hero-price-flag">{{ t('tickets.from') }} <strong>{{ n(72, 'euro') }}</strong></span>
  </section>
</template>
