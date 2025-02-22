
interface InputProps {
    placeholder: string;
    size?: 'small' | 'large';
    onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

export default function Input({ placeholder, size, onChange }: InputProps) {

  return <input placeholder={placeholder} 
  style={{ padding: size == "small" ? '10px' : '20px', margin: size == "small" ? '10px' : '20px', 
  borderRadius: '5px',borderColor: 'black', 
  borderWidth: '1px', borderStyle: 'solid'}}
  onChange={onChange}>
    </input>
}