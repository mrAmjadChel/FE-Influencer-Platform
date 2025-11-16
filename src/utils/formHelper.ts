export const toNumberOrNull = (value: string | number | undefined | null) =>
  value !== "" && value !== undefined && value !== null ? Number(value) : null;

export const formatDate = (value: string | null | undefined) =>
  value ? value.split("T")[0] : null;
