export interface Tag {
  _id: string;

  project_id: string;

  name: string;

  color: string;

  createdAt: string;

  updatedAt: string;
}

export interface CreateTagPayload {
  name: string;

  color?: string;
}

export interface UpdateTagPayload {
  name?: string;

  color?: string;
}