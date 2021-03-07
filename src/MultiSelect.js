import "./styles.css";
import { useState } from "react";
import PropTypes from "prop-types";

const arrayReplace = (arr, index, item) => {
  return [
    ...arr.slice(0, index),
    ...(Array.isArray(item) ? item : [item]),
    ...arr.slice(index + 1)
  ];
};

const SelectItem = ({ item, index, onUpdate }) => {
  return (
    <div
      key={item.id}
      onClick={() => onUpdate({ ...item, selected: !item.selected }, index)}
      className={"option " + (item.selected ? "disabled" : "")}
    >
      <p>{item.label}</p>
      <i
        className={item.selected ? "fas fa-check" : "fa fa-plus"}
        aria-hidden="true"
      ></i>
    </div>
  );
};

const Tag = ({ label }) => {
  return <span className="tag">{label}</span>;
};

const MultiSelect = ({ items = [], onSelect }) => {
  const [showDropdown, setShowDropdown] = useState(false);
  const [filteredItems, setFilteredItems] = useState(items);
  const [selectedItems, setSelectedItems] = useState(
    items.filter((item) => item.selected)
  );
  const onSearch = ({ target: { value } }) => {
    if (value === "" || !value)
      return setFilteredItems(
        items.map(
          (item) => selectedItems.find((si) => si.id === item.id) || item
        )
      );

    return setFilteredItems(
      items
        .map((item) => selectedItems.find((si) => si.id === item.id) || item)
        .filter((item) =>
          item.label.toLowerCase().includes(value.toLowerCase())
        )
    );
  };

  const updateSelection = (item, index) => {
    let newSelectedItems;
    if (!item.selected)
      newSelectedItems = selectedItems.filter((si) => si.id !== item.id);
    else newSelectedItems = [...selectedItems, item];
    setSelectedItems(newSelectedItems);
    setFilteredItems((items) => arrayReplace(items, index, item));
    onSelect(newSelectedItems);
  };
  return (
    <div className="multi-select-container">
      <div
        onClick={() => setShowDropdown(!showDropdown)}
        className="multi-select"
      >
        {selectedItems.length ? (
          selectedItems.map((item) => <Tag key={item.id} label={item.label} />)
        ) : (
          <span id="select">Select...</span>
        )}
      </div>
      {showDropdown && (
        <div className="options-dropdown">
          <input
            onChange={onSearch}
            placeholder="Search.."
            style={{ marginLeft: 8 }}
          />
          <hr />

          {filteredItems.map((item, index) => (
            <SelectItem
              key={index}
              item={item}
              index={index}
              onUpdate={updateSelection}
            />
          ))}
        </div>
      )}
    </div>
  );
};

MultiSelect.propTypes = {
  items: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      label: PropTypes.string.isRequired
    })
  ).isRequired,
  onSelect: PropTypes.func.isRequired
};

export default MultiSelect;
