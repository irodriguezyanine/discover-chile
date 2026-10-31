export type DeskCursor = {
  id: string;
  src: string;
  x: number;
  y: number;
  label: string;
};

export const deskCursors: DeskCursor[] = [
  { id: "moai", src: "/cursors/moai.png", x: 20, y: 6, label: "Moái" },
  {
    id: "condorito",
    src: "/cursors/condorito.png",
    x: 20,
    y: 8,
    label: "Condorito",
  },
  {
    id: "piscola",
    src: "/cursors/piscola.png",
    x: 20,
    y: 4,
    label: "Piscola",
  },
  {
    id: "indio",
    src: "/cursors/indio.png",
    x: 12,
    y: 4,
    label: "Indio pícaro",
  },
];

const CURSOR_KEY = "dc-cursor";

export function getCursor(id: string) {
  return deskCursors.find((item) => item.id === id) ?? deskCursors[0];
}

export function applyCursor(id: string) {
  const cursor = getCursor(id);
  document.documentElement.style.setProperty(
    "--dc-cursor",
    `url("${cursor.src}") ${cursor.x} ${cursor.y}`,
  );
  document.documentElement.dataset.cursor = cursor.id;
}

export function persistCursor(id: string) {
  applyCursor(id);
  window.localStorage.setItem(CURSOR_KEY, id);
}

export function isDeskCursor(value: string | null | undefined) {
  return Boolean(value && deskCursors.some((item) => item.id === value));
}
