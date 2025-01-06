export default function FormInput ({
    name, label, type, onChange, placeholder, value
    } : {
        name: string, label: string, type:string, value: any, onChange: (e: any) => void, placeholder: string
    }){
    
    return (
        <div key={name} className="flex flex-col">
            <label className="text-white" htmlFor={name}>{label}</label>
            <input
                id={name}
                type={type}
                name={name}
                value={value}
                onChange={onChange}
                placeholder={placeholder}
                className="w-[17em] p-1.5 border rounded-md text-black pl-4"
            />
        </div>
);}