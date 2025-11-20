export default function InputRegister({ Icon, name, onChange, errors }: any) {
  return (
    <>
      <fieldset className='flex items-center gap-2 border-b-1 border-gray-300 w-full'>
        <Icon className='text-xl text-red-800' />
        <input
          type='text'
          name={name}
          onChange={onChange}
          placeholder='Type your email'
          className='input border-none focus:outline-none focus:ring-0 text-black bg-transparent'
        />
      </fieldset>
      <p className='text-xs text-red-500'>{errors}</p>
    </>
  );
}
