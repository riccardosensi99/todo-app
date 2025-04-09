import './button.css';

type ButtonProps = {
  label: string;
  onClick: () => void;
  type?: 'button' | 'submit';
};

export default function Button({ label, onClick, type = 'button' }: ButtonProps) {
  return (
    <button className="btn" onClick={onClick} type={type}>
      {label}
    </button>
  );
}

export {};
