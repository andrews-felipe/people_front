<template>
  <div id="app">
    <div class="container-flex">
      <header>
        <h1 class="title">L I S T A G E M</h1>
      </header>
      <form ref="form">
        <div class="form-row">
          <div class="col">
            <input v-model="name" type="text" class="form-control" placeholder="nome" />
          </div>
          <div class="col">
            <input v-model="email" type="text" class="form-control" placeholder="email" />
          </div>
          <div class="col">
            <input v-model="phone" type="number" class="form-control" placeholder="telefone" />
          </div>

          <div class="col">
            <button
              type="button"
              class="btn btn-brand btn-xing btn-block"
              data-toggle="modal"
              data-target="#exampleModal"
            >Adicionar</button>
          </div>
        </div>
      </form>
      <br />
      <div class="main">
        <table class="table">
          <thead>
            <tr>
              <th scope="col">Nome</th>
              <th scope="col">Telefone</th>
              <th scope="col">E-mail</th>
              <th scope="col" class="text-center">Ações</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <th scope="row">Andrew</th>
              <td>99988896</td>
              <td>mail@google.com</td>
              <td id="options-table">
                <div class="btn-group" role="group" aria-label="Basic example">
                  <button type="button" class="btn btn-danger">Excluir</button>
                  <button type="button" class="btn btn-warning">Editar</button>
                </div>
              </td>
            </tr>
            <tr v-for="people in people_list" v-bind:key="people.id">
              <th scope="row">{{people.name}}</th>
              <td>{{people.phone}}</td>
              <td>{{people.email}}</td>
              <td id="options-table">
                <div class="btn-group" role="group" aria-label="Basic example">
                  <button type="button" class="btn btn-danger">Excluir</button>
                  <button type="button" class="btn btn-warning">Editar</button>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <div id="whitespace"></div>
    </div>
  </div>
</template>

<script>
import http from "./services/http";

export default {
  name: "App",
  data: () => ({
    status: true,
    people_list: [],
    // campos do form
    id: null,
    name: "",
    email: "",
    phone: null
  }),
  methods: {
    addPeople(object) {
      if (this.validations(this.buildObject())) {
        return http.post("pessoas", object).then(() => {
          alert("Usuário Cadastrado com seucesso!");
          this.getAllPeople();
          this.clearFields();
        });
      }
    },
    removePeople(id) {
      return http.delete(`pessoas/${id}`).then(() => {
        alert("Usuário Excluido com seucesso!");
        this.getAllPeople();
      });
    },

    putPeople(id, object) {
      if (this.validations(this.buildObject())) {
        return http.put(`pessoas/${id}`, object).then(() => {
          alert("Usuário Alterado com seucesso!");
          this.getAllPeople();
          this.clearFields();
        });
      }
    },

    validations(object) {
      if (!object.name || !object.phone || !object.email) {
        return false;
      }
      return true;
    },

    buildObject() {
      return { name: this.name, phone: this.phone, email: this.email };
    },

    goToEdit(object) {
      (this.id = object.id),
        (this.name = object.name),
        (this.phone = object.phone),
        (this.email = object.email);
    },

    clearFields() {
      (this.id = null),
        (this.name = ""),
        (this.phone = null),
        (this.email = "");
    },

    getAllPeople() {
      return http.getAll("pessoas").then(res => {
        this.people_list = res.data;
      });
    }
  },
  mounted() {
    this.getAllPeople();
  }
};
</script>

<style lang="scss">
@import "~@coreui/coreui/scss/coreui";
@import url("https://fonts.googleapis.com/css2?family=Montserrat:wght@500&display=swap");

body {
  font-family: "Montserrat", sans-serif !important;
}
.main,
form {
  width: 600px;
}
.main {
  background-color: white;
  border-radius: 5px;
  box-shadow: 3px 4px #0000000d;
}
.container-flex {
  display: flex;
  width: 100%;
  height: 100%;
  position: absolute;
  flex-direction: column;
  padding-top: 15%;
  /* justify-content: space-around; */
  align-items: center;
}
header {
  display: flex;
  justify-content: space-between;
  padding-bottom: 13px;
}
.title {
  margin-bottom: unset;

  font-size: 1.5rem;
  color: #026466;
}
#options-table {
  display: flex;
  justify-content: center;
  align-items: center;
}
.table th,
.table td {
  border-top: unset;
  text-align: center;
  vertical-align: unset;
}
#whitespace {
  height: 10%;
}
</style>
