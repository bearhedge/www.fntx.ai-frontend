import Card from "../Card";
import Input from "../form/input";

type InputCardProps = {
  text: string;
};

const InputCard = ({ text }: InputCardProps) => {
  return (
    <Card className="h-100 input-card">
      <div className="flex-grow-1">
        <div className="col-sm-3 col-6"></div>
        <div className="col-sm-9 col-6">
          <label htmlFor="">{text}</label>
        </div>
      </div>
      <Input placeholder="Type your question here..." />
    </Card>
  );
};

export default InputCard;
