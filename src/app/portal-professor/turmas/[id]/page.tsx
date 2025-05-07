import React from "react";
import { getSingleTurma } from "./actions";

type Params = Promise<{
  id: string;
}>;

const DetalhesTurma = async (props: { params: Params }) => {
  const { id } = await props.params;

  console.log(id);

  return <div>{id}</div>;
};

export default DetalhesTurma;
