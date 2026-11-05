<script setup lang="ts">
import { useI18n } from 'vue-i18n'
import type { SupportedLocale } from '../i18n'

// Matches presentation slide 10: the shared locale is a reactive Ref.
const { locale, t } = useI18n({ useScope: 'global' })

const options: { code: SupportedLocale; short: string; full: string }[] = [
  { code: 'de-DE', short: 'DE', full: 'Deutsch' },
  { code: 'en-US', short: 'EN', full: 'English' },
]

function changeLanguage(next: SupportedLocale) {
  locale.value = next
}
</script>

<template>
  <div class="language-switcher" role="group" :aria-label="t('navigation.language')">
    <button
      v-for="option in options"
      :key="option.code"
      type="button"
      class="language-option"
      :class="{ 'is-active': locale === option.code }"
      :aria-label="option.full"
      :aria-pressed="locale === option.code"
      @click="changeLanguage(option.code)"
    >
      {{ option.short }}
    </button>
  </div>
</template>
