<template>
  <q-card>
    <q-card-section class="row items-center q-pb-none">
      <q-space />
      <q-btn icon="close" flat round dense v-close-popup />
    </q-card-section>

    <q-card-section>
      <div class="q-pa-md">
        <slot></slot>
      </div>
    </q-card-section>
  </q-card>
</template>
<script>
export default {
  name: "BasicDialogCard",
};
</script>