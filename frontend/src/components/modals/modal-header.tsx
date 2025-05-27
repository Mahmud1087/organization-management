const ModalHeader = ({ title }: { title: string }) => {
  return (
    <header>
      <h1 className='text-sm font-semibold'>{title}</h1>
      <hr className='border-x-0 border-t-0 my-3' />
    </header>
  );
};
export default ModalHeader;
