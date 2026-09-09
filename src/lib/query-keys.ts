export const queryKeys = {
  users: {
    all: ["users"] as const,
    detail: (id: number) => ["users", id] as const,
  },
};
