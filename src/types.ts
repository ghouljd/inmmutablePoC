export interface ActionType {
  type: string;
  payload?: Pokemon;
};

export interface Pokemon {
  name: string;
  image: string;
};

export interface StateType {
  index: number;
  pokemon: Pokemon;
};
