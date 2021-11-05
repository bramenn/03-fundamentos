<template>
  <h2>{{ customTitle }}</h2>
  <p>
    {{ counter }} <sup>{{ pow }}</sup> = {{ squareCounter }}
  </p>

  <div>
    <button @click="decrease()">-1</button>
    <button @click="increase()">+1</button>
  </div>
</template>

<script>
export default {
  props: {
    title: String,
    start: {
      type: Number,
      default: 5,
      //   required: true,
      validator(value) {
        return value >= 0;
      },
    },
  },

  data() {
    return {
      counter: this.start,
      pow: 3,
    };
  },

  methods: {
    increase() {
      this.counter += 1;
    },

    decrease() {
      this.counter -= 1;
    },
  },

  computed: {
    squareCounter() {
      return Math.pow(this.counter, this.pow);
    },
    customTitle() {
      return this.title ? this.title : "Counter";
    },
  },
};
</script>

<style>
button {
  background-color: black;
  border-radius: 5px;
  color: aliceblue;
  margin: 0 5px;
  cursor: pointer;
  padding: 5px 15px;
  transition: 0.3s ease-in-out;
}

button:hover {
  background-color: rgba(0, 0, 0, 0.466);
  transition: 0.3s ease-in-out;
}
</style>
