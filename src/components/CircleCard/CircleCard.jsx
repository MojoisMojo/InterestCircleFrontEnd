// /src/components/CircleCard/CircleCard.jsx

const CircleCard = ({ title, description, image }) => {
  return (
    <div className="circle-card">
      <div className="circle-card__image">
        <img src={image} alt={title} />
      </div>
      <div className="circle-card__content">
        <h2>{title}</h2>
        <p>{description}</p>
      </div>
    </div>
  );
};

export default CircleCard;