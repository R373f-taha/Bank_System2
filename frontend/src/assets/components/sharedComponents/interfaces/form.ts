
export interface Field{
    name:string;
    type:string;
    placeholder:string;
}

export interface SharedFormProps {
    title: "Login" | "Sign Up"; 
    description: string;
    fields: Field[];
    submitText: string;
    secondaryText: "Login" | "Sign Up";
    onSubmit: (data: Record<string, string>) => void;
}