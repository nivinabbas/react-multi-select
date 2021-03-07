import MultiSelect from "./MultiSelect";
import "./styles.css";

const items = [
  {
    id: 1,
    label: "Budget"
  },
  {
    id: 2,
    label:'buy something'
  }
];

export default function App() {
  return <MultiSelect items={items} onSelect={(items) => console.log(items)} />;
}
