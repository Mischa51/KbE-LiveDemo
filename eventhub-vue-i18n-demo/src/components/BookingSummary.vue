<script setup lang="ts">
import { computed } from 'vue'
import { useI18n } from 'vue-i18n'
import { ArrowUpRight, RotateCcw, ShieldCheck } from 'lucide-vue-next'
import { calculateTotal } from '../data/concert'
import type { TicketCategoryId } from '../data/concert'

const props = defineProps<{ category: TicketCategoryId; quantity: number }>()
defineEmits<{ checkout: []; reset: [] }>()
const { t, n } = useI18n({ useScope: 'global' })
const total = computed(() => calculateTotal(props.category, props.quantity))
</script>

<template>
  <div class="booking-summary">
    <div class="summary-top">
      <div>
        <span class="summary-label">{{ t('tickets.subtotal') }}</span>
        <div class="summary-value" aria-live="polite" aria-atomic="true">{{ n(total, 'euro') }}</div>
      </div>
      <button class="reset-link" type="button" @click="$emit('reset')"><RotateCcw :size="14" />{{ t('tickets.reset') }}</button>
    </div>
    <button class="checkout-button" :disabled="quantity === 0" type="button" @click="$emit('checkout')">
      <span>{{ t('tickets.checkout') }}</span>
      <ArrowUpRight :size="21" aria-hidden="true" />
    </button>
    <p class="checkout-assurance"><ShieldCheck :size="15" aria-hidden="true" />{{ t('tickets.taxNote') }}</p>
  </div>
</template>
