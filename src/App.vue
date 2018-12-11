<template>
  <div id="app">
    <div id="nav">
      <router-link to="/">Schedule</router-link> |
      <router-link to="/admin">Admin</router-link>
    </div>
    <router-view/>
  </div>
</template>

<style>
body {
  margin:0;
  padding: 0;
  background-color: lightgray;
}
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}
#nav {
  padding: 30px;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #42b983;
}

label {
  font-size: smaller;
  font-weight: 600;
}
input, select {
  margin-bottom: 0.5em;
  margin-right: 0.5em;
  display: block;
  font-size: large;
}
input[type=number] {
  width:60px;
}
button {
  position: absolute;
  background-color: darkgreen;
  color: white;
  padding: 0.5em;
  margin: 0;
  font-size: large;
  bottom: 0;
  right: 0;
  border: 0;
  box-shadow: 0 5px 10px rgba(0, 0, 0, 0.3);
}
</style>
