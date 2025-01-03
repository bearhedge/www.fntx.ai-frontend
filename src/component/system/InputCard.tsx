import Card from "../Card";
import Button from "../form/button";
import Input from "../form/input";
import SendIco from "@assets/svg/submit_ico.svg"
import ChatIco from "@assets/images/chat-ico.png"
type InputCardProps = {
  text: string;
};

const InputCard = ({ text }: InputCardProps) => {
  return (
    <Card className="h-100 input-card">
      <div className="flex-grow-1">
        <div className="col-sm-3 col-6"></div>
        <div className="col-sm-9 col-6">
          <label htmlFor="" className="d-flex align-items-start"><img src={ChatIco} className='me-3'/> {text}</label>
        </div>
      </div>
      <div className="position-relative">
        <Input placeholder="Type your question here..." />
        <Button className="btn d-flex" type="button">
          <img src={SendIco} alt='send' />
        </Button>
      </div>
    </Card>
  );
};

export default InputCard;
