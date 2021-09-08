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
