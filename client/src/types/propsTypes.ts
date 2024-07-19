import { IInputs } from "./stateTypes";

export interface IType {
  type: "signin" | "signup";
  inputs: IInputs;
}

export interface AuthFormProps {
    title: string;
    type: "signin" | "signup";
}

