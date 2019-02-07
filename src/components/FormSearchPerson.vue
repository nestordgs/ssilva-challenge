<template>
  <b-form @submit.prevent="submit">
    <b-form-group id="filterPersonGroup" label-for="filterPerson">
      <b-form-input
        id="filterPerson"
        type="text"
        v-model="form.filter"
        :state="!$v.form.filter.$invalid"
        placeholder="Enter Filter Search Persons"
      />
      <b-form-invalid-feedback
        id="input1LiveFeedback"
        v-if="!$v.form.filter.alphaNum"
      >
        This field must be only alphanumeric
      </b-form-invalid-feedback>
    </b-form-group>
    <!-- <b-button type="submit" variant="primary" :disabled="$v.form.$invalid">
      Submit
    </b-button> -->
  </b-form>
</template>

<script>
import { validationMixin } from "vuelidate";
import { alphaNum } from "vuelidate/lib/validators";

export default {
  name: "filterPersonForm",
  data() {
    return {
      form: {}
    };
  },
  mixins: [validationMixin],
  validations: {
    form: {
      filter: {
        alphaNum
      }
    }
  },
  methods: {
    onSubmit() {}
  }
};
</script>
