<template>
  <b-form @submit.prevent="submit">
    <b-form-group id="parameterSearchGroup" label-for="parameterSearch">
      <b-input-group>
        <b-form-input
          id="parameterSearch"
          name="parameterSearch"
          size="sm"
          type="text"
          v-model="parameterSearch"
          :state="!$v.parameterSearch.$invalid"
          placeholder="Enter additional parameters to search"
          @keyup.native="filterRequest"
        />
        <b-input-group-append>
          <b-btn
            size="sm"
            @click="
              parameterSearch = '';
              filterRequest();
            "
          >
            Clear
          </b-btn>
        </b-input-group-append>
      </b-input-group>
      <b-form-invalid-feedback
        id="input1LiveFeedback"
        v-if="!$v.parameterSearch.alphaNum"
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
  name: "parameterSearch",
  data() {
    return {
      parameterSearch: ""
    };
  },
  mixins: [validationMixin],
  validations: {
    parameterSearch: {
      alphaNum
    }
  },
  methods: {
    filterRequest() {
      if (this.$v.parameterSearch.alphaNum) {
        if (this.parameterSearch) {
          this.$store.dispatch(
            "getCharacters",
            `?search=${this.parameterSearch}`
          );
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
