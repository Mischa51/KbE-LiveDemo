<script setup lang="ts">
import { AudioLines, ArrowUpRight } from 'lucide-vue-next'
import { useI18n } from 'vue-i18n'
import LanguageSwitcher from './LanguageSwitcher.vue'

const { t } = useI18n({ useScope: 'global' })
</script>

<template>
  <header class="app-header">
    <a class="brand" href="#top" :aria-label="t('navigation.home')">
      <span class="brand-mark"><AudioLines :size="21" :stroke-width="2.5" /></span>
      <span class="brand-name">EVENT<span>HUB</span><i>.</i></span>
    </a>
    <nav class="main-nav" :aria-label="t('navigation.primary')">
      <a class="nav-link current" href="#top">{{ t('concerts.title') }}</a>
      <a class="nav-link" href="#details">{{ t('navigation.events') }}</a>
      <a class="nav-link" href="#about">{{ t('navigation.about') }}</a>
    </nav>
    <div class="header-actions">
      <LanguageSwitcher />
      <div class="user-chip">
        <span class="user-avatar">M</span>
        <span class="user-label">Michael <ArrowUpRight :size="13" aria-hidden="true" /></span>
      </div>
    </div>
  </header>
</template>
