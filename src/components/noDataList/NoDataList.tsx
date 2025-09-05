import "./NoDataList.css";

interface NoDataListProps {
  image: string;
  text: string;
  imageAlt: string;
}

const NoDataList = ({ image, text, imageAlt }: NoDataListProps) => {
  return (
    <div className="noDataList-container">
      <img src={image} alt={imageAlt} />
      <p>{text}</p>
    </div>
  );
};

export default NoDataList;
