export interface Config {
  environment: string;
  resources: { db: string };
}

export interface Link {
  id: string;
  userId: string;
  name: string;
  link: string;
  createdDate: string;
  updatedDate: string;
}
