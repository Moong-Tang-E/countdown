import React from 'react'

const ColorPickInput: React.FC<{
  color: string,
  setColor: React.Dispatch<React.SetStateAction<string>>
}> = ({ color, setColor }) => {
  const [input, setInput] = React.useState<JSX.Element>(<></>);

  React.useEffect(() => {
    setInput(<input type='color' value={color} onChange={handleColorChange} className='text-black border border-gray-300 rounded h-10 w-10' />);
  }, [color]);

  const handleColorChange: React.ChangeEventHandler<HTMLInputElement> = ({ target: { value } }) => {
    setColor(value);
    const elem = document.querySelector('form.embed-config-form > ul > li > label.error');
    if (elem) elem.innerHTML = /^#?[a-f|A-F|0-9]{6}$/.test(value) ? '' : 'invalid format!';
  } 

  return (
    <>
      <label>Timer Color</label>
      <br />
      <div className='flex items-center gap-2'>
        <input type='text' value={color} onChange={handleColorChange} className='text-black border  border-gray-300 rounded px-3 py-2' />
        {input}
      </div>
      <label className='error'></label>
    </>
  )
}

export default ColorPickInput;