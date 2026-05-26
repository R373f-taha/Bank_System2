export interface SelectOption {
    label: string;
    value: string;
}

export interface Field {
    name: string;
    type: string; 
    placeholder: string;
    options?: SelectOption[]; 
}

export interface SharedFormProps {
    title: "Login" | "Create Bank Account" | "Verify Account"; 
    description: string;
    fields: Field[];
    submitText: string;
    secondaryText: "Login" | "Sign Up";
    onSubmit: (data: Record<string, string>) => void;
}