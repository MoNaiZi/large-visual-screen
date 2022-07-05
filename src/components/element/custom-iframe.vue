<template>
  <iframe
    loading="lazy"
    width="100%"
    height="100%"
    :src="option.attribute.url"
  ></iframe>
</template>

<script>
export default {
  name: "custom-iframe",
  title: "外部网页",
  icon: "Promotion",
  group: "basic",
  catalogue: "element",
  props: {
    option: Object,
  },
};
</script>

<style scoped>
</style>
