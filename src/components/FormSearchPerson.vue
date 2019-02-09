<template>
  <b-form @submit.prevent="submit">
    <b-form-group id="filterPersonGroup" label-for="filterPerson">
      <b-form-input
        id="filterPerson"
        name="filterPerson"
        size="sm"
        type="text"
        v-model="filter"
        :state="!$v.filter.$invalid"
        placeholder="Enter additional parameters to search"
        @keyup.native="filterRequest"
      />
      <b-form-invalid-feedback
        id="input1LiveFeedback"
        v-if="!$v.filter.alphaNum"
      >
        This field must be only alphanumeric
      </b-form-invalid-feedback>
    </b-form-group>
  </b-form>
</template>

<script>
import { validationMixin } from "vuelidate";
import { alphaNum } from "vuelidate/lib/validators";

export default {
  name: "filterPersonForm",
  data() {
    return {
      filter: ""
    };
  },
  mixins: [validationMixin],
  validations: {
    filter: {
      alphaNum
    }
  },
  methods: {
    filterRequest() {
      if (this.$v.filter.alphaNum) {
        if (this.filter) {
          this.$store.dispatch("getCharacters", `?search=${this.filter}`);
        } else {
          this.$store.dispatch("getCharacters");
        }
      }
    },
    submit() {
      //
    }
  }
};
</script>
