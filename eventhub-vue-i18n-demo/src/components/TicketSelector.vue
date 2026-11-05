<script setup lang="ts">
import { computed } from 'vue'
import { useI18n } from 'vue-i18n'
import { Check, Minus, Plus } from 'lucide-vue-next'
import { MAX_TICKETS, ticketCategories } from '../data/concert'
import type { TicketCategoryId } from '../data/concert'

const props = defineProps<{ category: TicketCategoryId; quantity: number }>()
const emit = defineEmits<{
  'update:category': [value: TicketCategoryId]
  'update:quantity': [value: number]
}>()
const { t, n } = useI18n({ useScope: 'global' })

const canDecrement = computed(() => props.quantity > 0)
const canIncrement = computed(() => props.quantity < MAX_TICKETS)

function adjust(delta: 1 | -1) {
  emit('update:quantity', Math.min(MAX_TICKETS, Math.max(0, props.quantity + delta)))
}
</script>

<template>
  <div class="ticket-selection">
    <div class="field-label-row">
      <h3 class="field-label">{{ t('tickets.category') }}</h3>
      <span class="field-hint">EUR <span class="tiny-orange-dot"></span></span>
    </div>
    <div class="category-list" role="group" :aria-label="t('tickets.category')">
      <button
        v-for="item in ticketCategories"
        :key="item.id"
        type="button"
        class="category-choice"
        :class="{ selected: category === item.id }"
        :aria-pressed="category === item.id"
        @click="emit('update:category', item.id)"
      >
        <span class="choice-indicator"><Check v-if="category === item.id" :size="13" :stroke-width="3" /></span>
        <span class="choice-info">
          <strong>{{ t(item.labelKey) }}</strong>
          <small>{{ t(item.detailKey) }}</small>
        </span>
        <span class="choice-price">{{ n(item.price, 'euro') }}</span>
      </button>
    </div>
    <div class="quantity-zone">
      <div class="quantity-head">
        <span class="field-label">{{ t('tickets.quantity') }}</span>
        <!-- Matches slide 11 exactly: real Vue-I18n pipe variants, no conditional translations. -->
        <span class="selected-grammatical" aria-live="polite" aria-atomic="true">
          {{ t('tickets.selected', quantity) }}
        </span>
      </div>
      <div class="quantity-controls">
        <button type="button" class="step-button" :disabled="!canDecrement" :aria-label="t('tickets.decrement')" @click="adjust(-1)"><Minus :size="19" /></button>
        <output class="quantity-value" :aria-label="t('tickets.quantity')">{{ quantity.toString().padStart(2, '0') }}</output>
        <button type="button" class="step-button" :disabled="!canIncrement" :aria-label="t('tickets.increment')" @click="adjust(1)"><Plus :size="19" /></button>
        <small class="quantity-limit">{{ t('tickets.max') }}</small>
      </div>
    </div>
  </div>
</template>
