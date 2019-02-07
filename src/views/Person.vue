<template>
  <div class="person">
    <h1>Persons</h1>
    <FormSearchPerson />
  </div>
</template>

<script>
import FormSearchPerson from "@/components/FormSearchPerson";

export default {
  name: "persons",
  components: {
    FormSearchPerson
  }
};
</script>
