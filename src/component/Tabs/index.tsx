import { systemtab } from "../../lib/dummyArray";
interface Iprops {
  handleTab: (val: number) => void;
  tab: number;
}
export default function Tabs({ handleTab, tab }: Iprops) {
  return (
    <ul className="tabs">
      {systemtab?.map((items: string, key: number) => (
        <li
          key={key}
          className={`tabs__list ${tab === key ? "active" : ""}`}
          onClick={() => handleTab(key)}
        >
          <span
            className={`tabs__list-dot ${tab === key ? "active" : ""}`}
          ></span>
          {items}
        </li>
      ))}
    </ul>
  );
}
