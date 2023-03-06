type Props = {
    name?: string;
    isOpen?: boolean;
    onClick?: (event: React.MouseEvent<HTMLElement>) => void;
    handleSubmit?: () => void;
};
const Button = ({ onClick, name }: Props) => {
    return (
        <div className="flex items-center justify-between">
            <button onClick={onClick} className={`${name === 'Delete' || name === 'Cancel' ? "bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" : "bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"}`} type="button" >
                {name}
            </button>
        </div >
    )
}
export default Button;