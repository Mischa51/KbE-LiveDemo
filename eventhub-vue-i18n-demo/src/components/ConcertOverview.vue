<script setup lang="ts">
import { useI18n } from 'vue-i18n'

// Same examples as slides 8–9, deliberately kept recognizable.
const { t } = useI18n({ useScope: 'global' })
</script>

<template>
  <div class="concert-overview">
    <h2 class="overview-kicker">{{ t('concerts.title') }} <span>/ 2026</span></h2>
    <p class="welcome">{{ t('user.welcome', { name: 'Michael' }) }}</p>
  </div>
</template>
