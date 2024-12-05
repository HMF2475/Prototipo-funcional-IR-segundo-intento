import { formValidators } from "../../../validators/formValidators";

export const registerFormInputs = [
  {
    tag: "Username",
    name: "username",
    type: "text",
    defaultValue: "",
    isRequired: true,
    validators: [formValidators.notEmptyValidator],
  },
  {
    tag: "Password",
    name: "password",
    type: "password",
    defaultValue: "",
    isRequired: true,
    validators: [formValidators.notEmptyValidator],
  },
  {
    tag: "First Name",
    name: "firstName",
    type: "text",
    defaultValue: "",
    isRequired: true,
    validators: [formValidators.notEmptyValidator],
  },
  {
    tag: "Last Name",
    name: "lastName",
    type: "text",
    defaultValue: "",
    isRequired: true,
    validators: [formValidators.notEmptyValidator],
  },
  {
    tag: "Second Name",
    name: "Second Name",
    type: "text",
    defaultValue: null,
    isRequired: false,
    validators:[],
  },
  {
    tag: "Direccion",
    name: "Direccion",
    type: "text",
    defaultValue: null,
    isRequired: false,
    validators: [],
  },
  {
    tag: "Telefono",
    name: "Telefono",
    type: "text",
    defaultValue: null,
    isRequired: false,
    validators: [],
  },
  {
    tag: "Sexo",
    name: "Sexo",
    type: "text",
    defaultValue: null,
    isRequired: false,
    validators: [],
  }
];


