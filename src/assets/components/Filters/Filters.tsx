import { Tabs } from "antd";
import TicketsList from "../TicketsList/TicketsList";
// import "./Filters.scss";

export default function Filters() {
    const onTabClick = (key: string) => {
        console.log(key);
    };
    return (
        <div className="tabs-wrapper">
            <Tabs
                onTabClick={onTabClick}
                type="card"
                size="large"
                items={[
                    {
                        label: `Самый быстрый`,
                        key: "1",
                        children: <TicketsList filter="fastest" />,
                    },
                    {
                        label: `Самый дешевый`,
                        key: "2",
                        children: <TicketsList filter="cheapest" />,
                    },
                    {
                        label: `Оптимальный`,
                        key: "3",
                        children: <TicketsList filter="most optimal" />,
                    },
                ]}
            />
        </div>
    );
}
