<template>
  <!-- eslint-disable vue/no-v-html -->
  <div>
    <div class="row">
      <div class="col">
        <q-select
          v-model="query.logicalOperator"
          :options="labels.matchTypes"
          :label="labels.matchType"
        />
      </div>
      <div class="col">
        <q-select v-model="selectedRule" :options="rules" label="Column" />
      </div>
      <div class="col self-end">
        <q-btn color="primary" :label="labels.addRule" @click="addRule" />
      </div>
    </div>
    <div class="row">
      <div class="col">
        <q-btn color="primary" :label="labels.addGroup" @click="addGroup" />
      </div>
    </div>
    <query-builder-children v-bind="$props" />
  </div>
</template>

<script>
import QueryBuilderGroup from "vue-query-builder/dist/group/QueryBuilderGroup.umd.js";
import QueryBuilderRule from "./QuasarRule.vue";
export default {
  name: "QueryBuilderGroup",
  components: {
    // eslint-disable-next-line vue/no-unused-components
    QueryBuilderRule: QueryBuilderRule,
  },
  extends: QueryBuilderGroup,
};
</script>