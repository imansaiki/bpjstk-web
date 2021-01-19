<template>
  <!-- eslint-disable vue/no-v-html -->
  <div class="vqb-rule bg-gray-100 rounded border border-gray-300 mb-3 p-3">
    <div class="flex flex-wrap items-center">
      <label class="mr-5">{{ rule.label }}</label>

      <!-- List of operands (optional) -->
      <select
        v-if="typeof rule.operands !== 'undefined'"
        v-model="query.operand"
        class="inline-block w-auto h-10 px-1 py-2 leading-normal gray-500 border border-gray-300 rounded mr-2"
      >
        <option v-for="operand in rule.operands" :key="operand">
          {{ operand }}
        </option>
      </select>

      <!-- List of operators (e.g. =, !=, >, <) -->
      <select
        v-if="
          typeof rule.operators !== 'undefined' && rule.operators.length > 1
        "
        v-model="query.operator"
        class="inline-block w-auto h-10 px-1 py-2 leading-normal gray-500 border border-gray-300 rounded mr-2"
      >
        <option
          v-for="operator in rule.operators"
          :key="operator"
          :value="operator"
        >
          {{ operator }}
        </option>
      </select>

      <!-- Basic text input -->
      <input
        v-if="rule.inputType === 'text'"
        v-model="query.value"
        class="inline-block w-auto h-10 px-1 py-2 leading-normal gray-500 border border-gray-300 rounded"
        type="text"
        :placeholder="labels.textInputPlaceholder"
      />

      <!-- Radio input -->
      <template v-if="rule.inputType === 'radio'">
        <div
          v-for="choice in rule.choices"
          :key="choice.value"
          class="flex items-center justify-center w-auto mr-3"
        >
          <input
            :id="
              'depth' + depth + '-' + rule.id + '-' + index + '-' + choice.value
            "
            v-model="query.value"
            :name="'depth' + depth + '-' + rule.id + '-' + index"
            type="radio"
            :value="choice.value"
            class="flex-shrink-0 mr-1 ml-0 mt-0 form-check-input"
          />
          <label
            class="flex items-center justify-center"
            :for="
              'depth' + depth + '-' + rule.id + '-' + index + '-' + choice.value
            "
            >{{ choice.label }}</label
          >
        </div>
      </template>

      <!-- Remove rule button -->
      <button
        type="button"
        class="close ml-auto"
        @click="remove"
        v-html="labels.removeRule"
      ></button>
    </div>
  </div>
</template>

<script>
import QueryBuilderRule from "vue-query-builder/dist/rule/QueryBuilderRule.umd.js";

export default {
  extends: QueryBuilderRule,
};
</script>
