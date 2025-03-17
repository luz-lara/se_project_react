function ItemCard({ item, onItemClick }) {
  return (
    <li className="itemCard">
      <p className="item__name">{item.name}</p>
      <img
        src={item.link}
        alt={item.name}
        className="item-image"
        onClick={() => onItemClick(item)}
      />
    </li>
  );
}

export default ItemCard;
