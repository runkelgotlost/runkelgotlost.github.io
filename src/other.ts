export interface Item {
    title: string,
    lost: boolean
}

export type Sake = string

export const Items: Item[] = [
    {
        title: "Handy",
        lost: false
    },
    {
        title: "Schuhe",
        lost: false
    },
    {
        title: "Geldbeutel",
        lost: false
    },
    {
        title: "Jacke",
        lost: false
    },
    {
        title: "Zigaretten",
        lost: false
    },
    {
        title: "Ausweis",
        lost: false,
    },
    {
        title: "Geld",
        lost: false
    }
];

export const Sakes: Sake[] = [
    "Will das Auto umparken",
    "Sucht nach Drogen",
    "Will nach hause"
];
