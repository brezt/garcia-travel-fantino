const dateFormatter = new Intl.DateTimeFormat("es-DO", {
  day: "numeric",
  month: "long",
  year: "numeric",
  timeZone: "America/Santo_Domingo",
});

export const formatDate = (isoDate: string) => dateFormatter.format(new Date(isoDate));
