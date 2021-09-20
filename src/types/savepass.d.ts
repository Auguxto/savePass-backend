// Types
type TNote = {
  user_id?: string;
  name: string;
  note_text: string;
  favorite?: boolean;
  folder?: string;
};

type TCredential = {
  user_id?: string;
  name: string;
  password: string;
  username?: string;
  email?: string;
  telephone?: string;
  note?: string;
  favorite?: boolean;
  folder?: string;
};

type TCard = {
  user_id?: string;
  name: string;
  number: string;
  password: string;
  flag: string;
  bank?: string;
  security_code: string;
  note?: string;
  favorite?: boolean;
  folder?: string;
};

type TFolder = {
  user_id?: string;
  name: string;
};

// Update Types
type UpdateNote = {
  name?: string;
  note?: string;
  folder?: string;
  favorite?: boolean;
};

type UpdateCredential = {
  folder?: string;
  name?: string;
  username?: string;
  email?: string;
  telephone?: string;
  password?: string;
  note?: string;
  favorite?: boolean;
};

type UpdateCard = {
  folder?: string;
  name?: string;
  number?: string;
  password?: string;
  flag?: string;
  bank?: string;
  security_code?: string;
  note?: string;
  favorite?: boolean;
};

type UpdateFolder = {
  name?: string;
  favorite?: boolean;
};
