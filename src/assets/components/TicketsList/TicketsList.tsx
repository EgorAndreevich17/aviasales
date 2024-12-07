import TicketBox from "../TicketBox/TicketBox";

interface TicketsListProps {
    filter: string;
}

export default function TicketsList({ filter }: TicketsListProps) {
    return <TicketBox />;
}
