export interface Animal {
  id: number;
  postDate: Date;
  url: string;
  description: string;
  allowComments: boolean;
  likes: number;
  comments: number;
  userId: number;
}

//Representação de uma coleção de animais.
export type Animais = Array<Animal>;
