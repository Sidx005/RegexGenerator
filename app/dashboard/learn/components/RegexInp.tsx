import { Input } from '@/components/ui/input'

type RegexProps = {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  flags?: string;
  prefix?: string;
}

const RegexInp: React.FC<RegexProps> = ({ prefix = '/', value, flags = 'gm', onChange }) => {

  return (
    <div className='mt-20 bg-black/20 flex items-center justify-center rounded-md relative min-h-20'>
      <p className='absolute left-2 -top-5 text-sm px-2 py-1 rounded-md bg-black text-white'>
        <code>Regex</code>
      </p>
      <div className="flex items-center justify-center gap-1 w-full text-xl text-black font-mono px-4">
        <span>{prefix}</span>
        <Input
          value={value}
          onChange={onChange}
         className="  max-w-full "

          placeholder="Enter regex pattern"
        />
        <span>/{flags}</span>
      </div>
    </div>
  )
}

export default RegexInp
