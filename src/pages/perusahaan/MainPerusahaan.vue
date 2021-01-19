<template>
  <q-page>
    <q-list bordered class="rounded-borders">
      <q-expansion-item
        expand-separator
        icon="drafts"
        label="Filter"
        header-class="text-purple"
      >
        <q-card>
          <q-card-section>
            <vue-query-builder :rules="rules"></vue-query-builder>
          </q-card-section>
        </q-card>
      </q-expansion-item>
    </q-list>
  </q-page>
</template>

<script>
import VueQueryBuilder from "vue-query-builder";
export default {
  name: "PerusdahaanMain",
  components: { VueQueryBuilder },
  data() {
    return {
      left: false,
      rules: [
        {
          type: "text",
          id: "vegetable",
          label: "Vegetable",
          operators: ["==", ">", "<"],
        },
        {
          type: "select",
          id: "fruit",
          label: "Fruit",
          choices: [
            { label: "Apple", value: "apple" },
            { label: "Banana", value: "banana" },
          ],
        },
      ],
    };
  },
};
</script>
