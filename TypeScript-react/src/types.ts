export interface CardProps {
    name: string;
    price: number;
    isSpecial?: boolean; // Optional prop
}
export interface ListProps {
    items: CardProps[];
}