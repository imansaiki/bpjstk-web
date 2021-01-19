<template>
  <q-page> <vue-query-builder :rules="rules"></vue-query-builder> </q-page>
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
