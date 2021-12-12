new Vue({
  el: "#app",
  data: () => ({
    msg: "Hello from vue.",
    query: "",
    results: [],
    phone: "",
    fromData: {
      phone: {
        value: "",
        rules: joi.string().min(10),
        error: "",
      },
      query: {
        value: "",
        rules: joi.string().min(5),
        error: "",
      },
      email: {
        value: "",
        rules: joi.string().min(5),
        error: "",
      },
      password: {
        value: "",
        rules: joi.string().min(5),
        error: "",
      },
    },
  }),
  watch: {
    query() {
      this.search();
    },
    fromData: {
      handler: function () {
        this.checkInput();
      },
      deep: true,
    },
  },
  methods: {
    save() {
      if (this.checkInput()) {
        console.log("form is valid post it to backend");
        return;
      }
      console.log("Yor form is not valid");
    },
    checkInput() {
      let isNotValidForm = Object.keys(this.fromData)
        .map((key) => {
          this.fromData[key].error = this.fromData[key].rules
            .validate(this.fromData[key].value)
            ?.error?.details[0].message.replace(
              "value",
              key.charAt(0).toUpperCase() + key.substring(1)
            );
          return this.fromData[key].error;
        })
        .filter((v) => !!v).length;
      return !isNotValidForm;
    },
    search() {
      console.log("requesting...");
      let random = Math.floor(Math.random() * 5 + 1);
      let r = Array(random)
        .fill("0")
        .map((v) => `${Date.now()},q:${this.query}`);
      this.results = r;
    },
    required(val) {
      return String(val).trim().length ? null : "This field is required!";
    },
  },
  mounted() {},
});
