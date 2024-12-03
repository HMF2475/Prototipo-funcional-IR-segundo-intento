import { formValidators } from "../../../validators/formValidators";

export const loginFormInputs = [
  {
    tag: "Nombre de usuario",
    name: "Nombre de usuario",
    type: "text",
    defaultValue: "",
    isRequired: true,
    validators: [formValidators.notEmptyValidator],
  },
  {
    tag: "Constraseña",
    name: "Constraseña",
    type: "password",
    defaultValue: "",
    isRequired: true,
    validators: [formValidators.notEmptyValidator],
  },
];