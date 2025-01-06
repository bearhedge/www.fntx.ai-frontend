const CircularButton = ({ text, bgColor }: { text: string, bgColor?: string }) => {
  return <button className={`round-button ${bgColor}`}>{text}</button>;
};

export default CircularButton;
