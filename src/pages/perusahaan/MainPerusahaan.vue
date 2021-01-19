<template>
  <q-page padding>
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
    <div class="q-pt-md">
      <q-table
        title="Treats"
        dense
        :data="data"
        :columns="columns"
        row-key="name"
      />
    </div>
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
          id: "perusahaan",
          label: "Perusahaan",
          operators: ["==", ">", "<"],
        },
        {
          type: "select",
          id: "pembina",
          label: "Pembina",
          choices: [
            { label: "Sukri Alnawawi", value: "Sukri Alnawawi" },
            { label: "Badrun Jawaludin", value: "badrun Jawaludin" },
          ],
        },
      ],
      columns: [
        {
          name: "name",
          required: true,
          label: "Dessert (100g serving)",
          align: "left",
          field: (row) => row.name,
          format: (val) => `${val}`,
          sortable: true,
        },
        {
          name: "calories",
          align: "center",
          label: "Calories",
          field: "calories",
          sortable: true,
        },
        { name: "fat", label: "Fat (g)", field: "fat", sortable: true },
        { name: "carbs", label: "Carbs (g)", field: "carbs" },
        { name: "protein", label: "Protein (g)", field: "protein" },
        { name: "sodium", label: "Sodium (mg)", field: "sodium" },
        {
          name: "calcium",
          label: "Calcium (%)",
          field: "calcium",
          sortable: true,
          sort: (a, b) => parseInt(a, 10) - parseInt(b, 10),
        },
        {
          name: "iron",
          label: "Iron (%)",
          field: "iron",
          sortable: true,
          sort: (a, b) => parseInt(a, 10) - parseInt(b, 10),
        },
      ],
    };
  },
};
</script>
